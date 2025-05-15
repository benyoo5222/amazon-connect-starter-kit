import { ContactFlowActionBlockTypes } from "@/contact-flow/enums/action-blocks/contact-flow-action-block-types";
import { ContactChannelTypes } from "@/contact-flow/enums/contact/contact-channel-types";
import { IContactFlowActionBlock } from "@/contact-flow/interfaces/action-blocks/contact-flow-action-block";
import { ContactFlowType } from "@/contact-flow/enums/flows/contact-flow-types";

export class AgentQActionBlock implements IContactFlowActionBlock {
  private _id: string;
  private _type: ContactFlowActionBlockTypes;
  private _parameters: Record<string, any>;
  private _transitions: Record<string, any>;
  private _supportedContactChannels: ContactChannelTypes[];
  private _supportedContactFlowTypes: ContactFlowType[];
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
    parameters: Record<string, any>;
    transitions: Record<string, any>;
    parentContactFlowType: ContactFlowType;
  }) {
    this._id = id;
    this._type = type;
    this._parameters = parameters;
    this._transitions = transitions;
    this._supportedContactFlowTypes = [
      ContactFlowType.INBOUND,
      ContactFlowType.CUSTOMER_QUEUE,
    ];
    this._supportedContactChannels = [
      ContactChannelTypes.VOICE,
      ContactChannelTypes.CHAT,
      ContactChannelTypes.TASK,
    ];
    this._parentContactFlowType = parentContactFlowType;
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

  get parentContactFlowType(): ContactFlowType {
    return this._parentContactFlowType;
  }

  get supportedContactFlowTypes(): ContactFlowType[] {
    return this._supportedContactFlowTypes;
  }
}
