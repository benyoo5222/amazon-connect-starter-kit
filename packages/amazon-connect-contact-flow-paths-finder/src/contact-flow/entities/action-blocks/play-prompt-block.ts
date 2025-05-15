import { ContactFlowActionBlockTypes } from "@/contact-flow/enums/action-blocks/contact-flow-action-block-types";
import { ContactChannelTypes } from "@/contact-flow/enums/contact/contact-channel-types";
import { ContactFlowType } from "@/contact-flow/enums/flows/contact-flow-types";
import { IPlayPromptBlock } from "@/contact-flow/interfaces/action-blocks/play-prompt-block";

export class PlayPromptActionBlock implements IPlayPromptBlock {
  private _id: string;
  private _type: ContactFlowActionBlockTypes;
  private _parameters: {
    PromptId?: string; // Id or ARN of the prompt to play
    Text?: string; // Text to play (Text to speech)
    SSML?: string; // SSML to play
    Media?: {
      Uri: string; // Location of the message
      SourceType: "S3"; // The source from which the message will be fetched. The only supported type is S3
      MediaType: "Audio"; // The type of the message to be played. The only supported type is Audio
    };
  };
  private _transitions: Record<string, any>;
  private _supportedContactFlowTypes: ContactFlowType[];
  private _supportedContactChannels: ContactChannelTypes[];
  private _parentContactFlowType: ContactFlowType;

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
    transitions: Record<string, any>;
    parentContactFlowType: ContactFlowType;
  }) {
    const { isValid, invalidReason } = this._areParametersValid({
      parameters,
      contactFlowType: parentContactFlowType,
    });

    if (!isValid) {
      throw new Error(invalidReason);
    }

    this._id = id;
    this._type = type;
    this._parameters = parameters;
    this._transitions = transitions;
    this._supportedContactFlowTypes = [
      ContactFlowType.INBOUND,
      ContactFlowType.CUSTOMER_QUEUE,
      ContactFlowType.CUSTOMER_WHISPER,
      ContactFlowType.OUTBOUND_WHISPER,
      ContactFlowType.AGENT_WHISPER,
    ];
    this._supportedContactChannels = [
      ContactChannelTypes.VOICE,
      ContactChannelTypes.CHAT,
      ContactChannelTypes.TASK,
    ];
    this._parentContactFlowType = parentContactFlowType;
  }

  /**************************************************
   * Private Methods
   **************************************************/
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

  /**************************************************
   * Public Methods
   **************************************************/
  /**
   * Checks if the contact channel type is supported by the action block and it's configuration
   *
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
    if (this._parameters.Media || this._parameters.PromptId) {
      return false;
    }

    // Since not audio, chat and task can receive text
    return this._supportedContactChannels.includes(contactChannelType);
  }

  /**************************************************
   * Getters
   **************************************************/
  get id(): string {
    return this._id;
  }

  get type(): ContactFlowActionBlockTypes {
    return this._type;
  }

  get parameters(): Record<string, any> {
    return this._parameters;
  }

  get transitions(): Record<string, any> {
    return this._transitions;
  }

  get supportedContactChannels(): ContactChannelTypes[] {
    return this._supportedContactChannels;
  }

  get supportedContactFlowTypes(): ContactFlowType[] {
    return this._supportedContactFlowTypes;
  }

  get parentContactFlowType(): ContactFlowType {
    return this._parentContactFlowType;
  }
}
