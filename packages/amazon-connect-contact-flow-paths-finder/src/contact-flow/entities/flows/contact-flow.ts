import { ContactFlowActionBlockTypes } from "@/contact-flow/enums/action-blocks/contact-flow-action-block-types";
import { ContactFlowType } from "@/contact-flow/enums/flows/contact-flow-types";
import { IContactFlowActionBlock } from "@/contact-flow/interfaces/action-blocks/contact-flow-action-block";
import { IContactFlow } from "@/contact-flow/interfaces/flows/contact-flow";
import { ContactChannelTypes } from "@/contact-flow/enums/contact/contact-channel-types";
import { ContactFlowStatus } from "@/contact-flow/enums/flows/contact-flow-status";
import { ContactFlowState } from "@/contact-flow/enums/flows/contact-flow-states";

export class ContactFlow implements IContactFlow {
  protected _id: string;
  protected _startActionBlockId: string;
  protected _type: ContactFlowType;
  protected _name: string;
  protected _description: string;
  protected _actionBlocks: IContactFlowActionBlock[];
  protected _supportedActionBlockTypes: ContactFlowActionBlockTypes[];
  protected _supportedContactChannelTypes: ContactChannelTypes[];
  protected _rawContactFlow: string;
  protected _status: ContactFlowStatus;
  protected _state: ContactFlowState;

  constructor({
    id,
    startActionBlockId,
    type,
    name,
    description,
    actionBlocks,
    supportedActionBlockTypes,
    supportedContactChannelTypes,
    rawContactFlow,
    status,
    state,
  }: {
    id: string;
    startActionBlockId: string;
    type: ContactFlowType;
    name: string;
    description: string;
    actionBlocks: IContactFlowActionBlock[];
    supportedActionBlockTypes: ContactFlowActionBlockTypes[];
    supportedContactChannelTypes: ContactChannelTypes[];
    rawContactFlow: string;
    status: ContactFlowStatus;
    state: ContactFlowState;
  }) {
    if (!this._isContactFlowPublished(status)) {
      throw new Error("Contact flow is not published");
    }

    const { isValid, unsupportedActionBlockTypes } =
      this._areActionBlocksSupported(actionBlocks, supportedActionBlockTypes);

    if (!isValid) {
      throw new Error(
        `Invalid action blocks: ${unsupportedActionBlockTypes?.join(", ")}`
      );
    }

    if (!this._doesStartActionBlockExist(actionBlocks, startActionBlockId)) {
      throw new Error("Start action block does not exist");
    }

    this._id = id;
    this._startActionBlockId = startActionBlockId;
    this._type = type;
    this._name = name;
    this._description = description;
    this._actionBlocks = actionBlocks;
    this._rawContactFlow = rawContactFlow;
    this._supportedActionBlockTypes = supportedActionBlockTypes;
    this._supportedContactChannelTypes = supportedContactChannelTypes;
    this._status = status;
    this._state = state;
  }

  /**************************************************
   * Private Methods
   **************************************************/
  /**
   * Checks if the action blocks are supported by the contact flow type
   *
   * @param actionBlocks - The action blocks to check
   * @param supportedActionBlockTypes - The supported action block types
   * @returns True if the action blocks are supported, false otherwise
   */
  _areActionBlocksSupported(
    actionBlocks: IContactFlowActionBlock[],
    supportedActionBlockTypes: ContactFlowActionBlockTypes[]
  ): {
    isValid: boolean;
    unsupportedActionBlockTypes?: ContactFlowActionBlockTypes[];
  } {
    const unsupportedActionBlockTypes = actionBlocks.filter(
      (actionBlock) => !supportedActionBlockTypes.includes(actionBlock.type)
    );

    if (unsupportedActionBlockTypes.length > 0) {
      return {
        isValid: false,
        unsupportedActionBlockTypes: unsupportedActionBlockTypes.map(
          (actionBlock) => actionBlock.type
        ),
      };
    }

    return { isValid: true };
  }

  /**
   * Checks if the contact flow is published
   *
   * @param status - The status of the contact flow
   * @returns True if the contact flow is published, false otherwise
   */
  _isContactFlowPublished(status: ContactFlowStatus): boolean {
    return status === ContactFlowStatus.PUBLISHED;
  }

  _doesStartActionBlockExist(
    actionBlocks: IContactFlowActionBlock[],
    startActionBlockId: string
  ): boolean {
    return actionBlocks.some(
      (actionBlock) => actionBlock.id === startActionBlockId
    );
  }

  /**************************************************
   * Public Methods
   **************************************************/
  /**
   * Checks if the action blocks in the contact flow are supported by the contact flow type
   *
   * @returns True if the action blocks are supported, false otherwise
   */
  areActionBlocksSupported(): boolean {
    return this._actionBlocks.every((actionBlock) =>
      this._supportedActionBlockTypes.includes(actionBlock.type)
    );
  }

  /**
   * Checks if the contact channel type is supported by the contact flow type
   *
   * @param contactChannelType - The contact channel type to check
   * @returns True if the contact channel type is supported, false otherwise
   */
  isContactChannelTypeSupported(
    contactChannelType: ContactChannelTypes
  ): boolean {
    return this._supportedContactChannelTypes.includes(contactChannelType);
  }

  /**
   * Gets the starting action block of the contact flow
   *
   * @returns The starting action block of the contact flow
   */
  getStartingActionBlock(): IContactFlowActionBlock {
    const startingActionBlock = this._actionBlocks.find(
      (actionBlock) => actionBlock.id === this._startActionBlockId
    );

    if (!startingActionBlock) {
      throw new Error("Starting action block does not exist");
    }

    return startingActionBlock;
  }
  /**************************************************
   * Getters
   **************************************************/
  get id(): string {
    return this._id;
  }

  get startActionBlockId(): string {
    return this._startActionBlockId;
  }

  get type(): ContactFlowType {
    return this._type;
  }

  get name(): string {
    return this._name;
  }

  get description(): string {
    return this._description;
  }

  get actionBlocks(): IContactFlowActionBlock[] {
    return this._actionBlocks;
  }

  get supportedActionBlockTypes(): ContactFlowActionBlockTypes[] {
    return this._supportedActionBlockTypes;
  }

  get rawContactFlow(): string {
    return this._rawContactFlow;
  }

  get supportedContactChannelTypes(): ContactChannelTypes[] {
    return this._supportedContactChannelTypes;
  }

  get status(): ContactFlowStatus {
    return this._status;
  }

  get state(): ContactFlowState {
    return this._state;
  }
}
