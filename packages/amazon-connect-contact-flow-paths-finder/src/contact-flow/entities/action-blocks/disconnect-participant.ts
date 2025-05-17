import { ContactFlowActionBlockTypes } from "@/contact-flow/enums/action-blocks/contact-flow-action-block-types";
import { ContactChannelTypes } from "@/contact-flow/enums/contact/contact-channel-types";
import { ContactFlowType } from "@/contact-flow/enums/flows/contact-flow-types";
import { ContactFlowActionBlock } from "./contact-flow-action-block";
import { IContactFlowActionBlock } from "@/contact-flow/interfaces/action-blocks/contact-flow-action-block";

export class DisconnectParticipantActionBlock
  extends ContactFlowActionBlock
  implements IContactFlowActionBlock
{
  constructor({
    id,
    type,
    parameters,
    transitions,
    parentContactFlowType,
    parentContactFlowId,
  }: {
    id: string;
    type: ContactFlowActionBlockTypes;
    parameters: Record<string, any>;
    transitions: Record<string, any>;
    parentContactFlowType: ContactFlowType;
    parentContactFlowId: string;
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
        ContactFlowType.TRANSFER_TO_AGENT,
        ContactFlowType.TRANSFER_TO_QUEUE,
      ],
      supportedContactChannels: [
        ContactChannelTypes.VOICE,
        ContactChannelTypes.CHAT,
        ContactChannelTypes.TASK,
      ],
      parentContactFlowId,
    });
  }

  /**************************************************
   * Public Methods
   **************************************************/

  /**
   * Gets the next action blocks
   * @returns The next action blocks
   */
  getNextActionBlockIds(contactChannelType: ContactChannelTypes): string[] {
    // No next action blocks
    return [];
  }
}
