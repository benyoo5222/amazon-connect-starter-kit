import { ContactFlowActionBlockTypes } from "@/contact-flow/enums/action-blocks/contact-flow-action-block-types";
import { ContactChannelTypes } from "@/contact-flow/enums/contact/contact-channel-types";
import { ContactFlowType } from "@/contact-flow/enums/flows/contact-flow-types";
import { IPlayPromptBlock } from "@/contact-flow/interfaces/action-blocks/play-prompt-block";
import { ContactFlowActionBlock } from "./contact-flow-action-block";

export class PlayPromptActionBlock
  extends ContactFlowActionBlock
  implements IPlayPromptBlock
{
  constructor({
    id,
    type,
    parameters,
    transitions,
    parentContactFlowType,
  }: {
    id: string;
    type: ContactFlowActionBlockTypes;
    parameters: {
      PromptId?: string;
      Text?: string;
      SSML?: string;
      Media?: {
        Uri: string;
        SourceType: "S3";
        MediaType: "Audio";
      };
    };
    transitions: {
      NextAction: string;
      Errors: [
        {
          NextAction: string;
          ErrorType: "NoMatchingError";
        },
      ];
    };
    parentContactFlowType: ContactFlowType;
  }) {
    super({
      id,
      type,
      parameters,
      transitions,
      parentContactFlowType,
      supportedContactFlowTypes: [
        ContactFlowType.INBOUND,
        ContactFlowType.CUSTOMER_QUEUE,
        ContactFlowType.CUSTOMER_WHISPER,
        ContactFlowType.OUTBOUND_WHISPER,
        ContactFlowType.AGENT_WHISPER,
      ],
      supportedContactChannels: [
        ContactChannelTypes.VOICE,
        ContactChannelTypes.CHAT,
        ContactChannelTypes.TASK,
      ],
    });

    const { isValid, invalidReason } = this._areParametersValid({
      parameters,
      contactFlowType: parentContactFlowType,
    });

    if (!isValid) {
      throw new Error(invalidReason);
    }
  }

  /**************************************************
   * Private Methods
   **************************************************/
  /**
   * Checks if the parameters are valid
   * @param parameters - The parameters to check
   * @param contactFlowType - The contact flow type
   * @returns True if the parameters are valid, false otherwise
   */
  _areParametersValid({
    parameters,
    contactFlowType,
  }: {
    parameters: {
      PromptId?: string;
      Text?: string;
      SSML?: string;
      Media?: {
        Uri: string;
        SourceType: "S3";
        MediaType: "Audio";
      };
    };
    contactFlowType: ContactFlowType;
  }): {
    isValid: boolean;
    invalidReason?: string;
  } {
    if (
      parameters.PromptId === undefined &&
      parameters.Text === undefined &&
      parameters.SSML === undefined &&
      parameters.Media === undefined
    ) {
      return {
        isValid: false,
        invalidReason: "No parameters provided",
      };
    }

    // Only one of the parameters can be provided
    let numberOfParametersProvided = 0;
    if (parameters.PromptId) numberOfParametersProvided++;
    if (parameters.Text) numberOfParametersProvided++;
    if (parameters.SSML) numberOfParametersProvided++;
    if (parameters.Media) numberOfParametersProvided++;

    if (numberOfParametersProvided > 1) {
      return {
        isValid: false,
        invalidReason: "Only one of the parameters can be provided",
      };
    }

    if (parameters.Media) {
      if (contactFlowType === ContactFlowType.CUSTOMER_QUEUE) {
        return {
          isValid: false,
          invalidReason: "Media is not supported for Customer Queue Flow",
        };
      }

      if (contactFlowType === ContactFlowType.CUSTOMER_WHISPER) {
        return {
          isValid: false,
          invalidReason: "Media is not supported for Customer Whisper Flow",
        };
      }

      if (contactFlowType === ContactFlowType.OUTBOUND_WHISPER) {
        return {
          isValid: false,
          invalidReason: "Media is not supported for Outbound Whisper Flow",
        };
      }

      if (contactFlowType === ContactFlowType.AGENT_WHISPER) {
        return {
          isValid: false,
          invalidReason: "Media is not supported for Agent Whisper Flow",
        };
      }

      if (parameters.Media.SourceType !== "S3") {
        return {
          isValid: false,
          invalidReason: "Media source type must be S3",
        };
      }

      if (parameters.Media.MediaType !== "Audio") {
        return {
          isValid: false,
          invalidReason: "Media type must be Audio",
        };
      }

      if (!parameters.Media.Uri) {
        return {
          isValid: false,
          invalidReason: "Media URI must be provided",
        };
      }

      return {
        isValid: true,
      };
    }

    return {
      isValid: true,
    };
  }

  /**
   * Checks if the block is configured for audio
   * @returns True if the block is configured for audio, false otherwise
   */
  _isBlockConfiguredForAudio() {
    return this._parameters.Media || this._parameters.PromptId;
  }

  /**************************************************
   * Public Methods
   **************************************************/
  /**
   * Checks if the contact channel type is supported by the action block and it's configuration
   * @override
   * @param contactChannelType - The contact channel type to check
   * @returns True if the contact channel type is supported, false otherwise
   */
  isContactChannelTypeSupported(
    contactChannelType: ContactChannelTypes
  ): boolean {
    if (contactChannelType === ContactChannelTypes.VOICE) {
      return true; // Voice is supported for all configurations
    }

    // Technically, email is not supported by the PlayPrompt block
    // But it always goes to the success path
    if (contactChannelType === ContactChannelTypes.EMAIL) {
      return true;
    }

    // Media or PromptID means that an Audio will play to the contact
    // Neither Chat or Task can listen to audio
    if (
      this._isBlockConfiguredForAudio() &&
      (contactChannelType === ContactChannelTypes.CHAT ||
        contactChannelType === ContactChannelTypes.TASK)
    ) {
      return false;
    }

    // Since not audio, chat and task can receive text
    return this._supportedContactChannels.includes(contactChannelType);
  }

  /**
   * Gets the next action blocks
   * @returns The next action blocks
   */
  getNextActionBlockIds(contactChannelType: ContactChannelTypes): string[] {
    // Next actions are determined by contact channel type, block's configuration,
    // contact flow type and transitions
    const errorPathBlockIds = this.transitions.Errors.map(
      (errorPath) => errorPath.NextAction
    );

    // First, check if the the contact channel type is supported
    // If not, it will always go the error path
    // But if there is no error path (older blocks), it will go to the success path
    if (!this.isContactChannelTypeSupported(contactChannelType)) {
      if (errorPathBlockIds.length > 0) {
        return errorPathBlockIds;
      }

      // No error path, so it will go to the success path
      return [this._transitions.NextAction];
    }

    // The contact channel type is supported, so get all the next action blocks
    return [...errorPathBlockIds, this._transitions.NextAction];
  }

  /**************************************************
   * Getters
   **************************************************/
  /**
   * @override
   * @returns The parameters of the play prompt action block
   */
  get parameters(): {
    PromptId?: string;
    Text?: string;
    SSML?: string;
    Media?: {
      Uri: string;
      SourceType: "S3";
      MediaType: "Audio";
    };
  } {
    return this._parameters as {
      PromptId?: string;
      Text?: string;
      SSML?: string;
      Media?: {
        Uri: string;
        SourceType: "S3";
        MediaType: "Audio";
      };
    };
  }

  /**
   * @override
   * @returns The transitions of the play prompt action block
   */
  get transitions(): {
    NextAction: string;
    Errors: [
      {
        NextAction: string;
        ErrorType: "NoMatchingError";
      },
    ];
  } {
    return this._transitions as {
      NextAction: string;
      Errors: [
        {
          NextAction: string;
          ErrorType: "NoMatchingError";
        },
      ];
    };
  }
}
