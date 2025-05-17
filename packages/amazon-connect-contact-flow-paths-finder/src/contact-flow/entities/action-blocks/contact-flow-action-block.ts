import { ContactChannelTypes } from "@/contact-flow/enums/contact/contact-channel-types";
import { ContactFlowType } from "@/contact-flow/enums/flows/contact-flow-types";
import { IContactFlowActionBlock } from "@/contact-flow/interfaces/action-blocks/contact-flow-action-block";
import {
  ContactFlowActionBlockTypes,
  ContactFlowNextActionBlockReason,
  ContactFlowNextActionBlockConditionType,
} from "@/contact-flow/enums/action-blocks/contact-flow-action-block-types";
import { ContactFlowNextActionBlockInfo } from "@/contact-flow/types/action-blocks/contact-flow-next-action-info";

export class ContactFlowActionBlock implements IContactFlowActionBlock {
  protected _id: string;
  protected _type: ContactFlowActionBlockTypes;
  protected _parameters: Record<string, any>;
  protected _transitions: Record<string, any>;
  protected _supportedContactFlowTypes: ContactFlowType[];
  protected _supportedContactChannels: ContactChannelTypes[];
  protected _parentContactFlowType: ContactFlowType;
  protected _parentContactFlowId: string;
  constructor({
    id,
    type,
    parameters,
    transitions,
    parentContactFlowType,
    parentContactFlowId,
    supportedContactFlowTypes,
    supportedContactChannels,
  }: {
    id: string;
    type: ContactFlowActionBlockTypes;
    parameters: Record<string, any>;
    transitions: Record<string, any>;
    parentContactFlowType: ContactFlowType;
    parentContactFlowId: string;
    supportedContactFlowTypes: ContactFlowType[];
    supportedContactChannels: ContactChannelTypes[];
  }) {
    this._id = id;
    this._type = type;
    this._parameters = parameters;
    this._transitions = transitions;
    this._supportedContactFlowTypes = supportedContactFlowTypes;
    this._supportedContactChannels = supportedContactChannels;
    this._parentContactFlowType = parentContactFlowType;
    this._parentContactFlowId = parentContactFlowId;
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
    // Override in child classes
    return this._supportedContactChannels.includes(contactChannelType);
  }

  /**
   * Gets the next action blocks
   * @returns The next action blocks
   */
  getNextActionBlocksInfo(
    contactChannelType: ContactChannelTypes
  ): ContactFlowNextActionBlockInfo[] {
    // Override in child classes
    return [];
  }

  /**
   * Creates a next action block info
   * @param id The next action block id
   * @param reason The next action block reason
   * @param error The error
   * @param condition_met The condition met
   * @returns The next action block info
   */
  createNextActionBlockInfo({
    id,
    reason,
    error,
    condition_met,
  }: {
    id: string;
    reason: ContactFlowNextActionBlockReason;
    error?: {
      type: string;
    };
    condition_met?: {
      conditionType: ContactFlowNextActionBlockConditionType;
      conditionValue: string;
    };
  }): ContactFlowNextActionBlockInfo {
    return {
      id,
      reason,
      error,
      condition_met,
    };
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

  get parentContactFlowId(): string {
    return this._parentContactFlowId;
  }
}
