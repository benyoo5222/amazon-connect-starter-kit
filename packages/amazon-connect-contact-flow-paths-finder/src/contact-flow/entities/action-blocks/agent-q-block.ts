import { ContactFlowActionBlockTypes } from "@/contact-flow/enums/action-blocks/contact-flow-action-block-types";
import { ContactChannelTypes } from "@/contact-flow/enums/contact/contact-channel-types";
import { IContactFlowActionBlock } from "@/contact-flow/interfaces/action-blocks/contact-flow-action-block";
import { ContactFlowType } from "@/contact-flow/enums/flows/contact-flow-types";
import { ContactFlowActionBlock } from "./contact-flow-action-block";

export class AgentQActionBlock
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
   * Checks if the contact channel type is supported by the action block
   *
   * @param contactChannelType - The contact channel type to check
   * @returns True if the contact channel type is supported, false otherwise
   */
  isContactChannelTypeSupported(
    contactChannelType: ContactChannelTypes
  ): boolean {
    return this._supportedContactChannels.includes(contactChannelType);
  }
}
