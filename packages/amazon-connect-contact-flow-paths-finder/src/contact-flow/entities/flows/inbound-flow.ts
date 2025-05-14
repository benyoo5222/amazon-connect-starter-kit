import { ContactFlowType } from "../../enums/flows/contact-flow-types";
import { IContactFlowActionBlock } from "../../interfaces/action-blocks/contact-flow-action-block";
import { IInboundContactFlow } from "../../interfaces/flows/inbound-flow";
import { ContactFlowActionBlockTypes } from "../../enums/action-blocks/contact-flowaction-block-types";

export class InboundContactFlow implements IInboundContactFlow {
  private readonly _id: string;
  private readonly _type: ContactFlowType.INBOUND;
  private readonly _name: string;
  private readonly _description: string;
  private readonly _actionBlocks: IContactFlowActionBlock[];
  private readonly _supportedActionBlockTypes: ContactFlowActionBlockTypes[];

  constructor(
    id: string,
    name: string,
    description: string,
    actionBlocks: IContactFlowActionBlock[]
  ) {
    this._id = id;
    this._type = ContactFlowType.INBOUND;
    this._name = name;
    this._description = description;
    this._actionBlocks = actionBlocks;
    this._supportedActionBlockTypes = [
      ContactFlowActionBlockTypes.PLAY_PROMPT,
      ContactFlowActionBlockTypes.AMAZON_Q_IN_CONNECT,
      ContactFlowActionBlockTypes.AUTHENTICATE_CUSTOMER,
      ContactFlowActionBlockTypes.CHECK_CONTACT_ATTRIBUTES,
      ContactFlowActionBlockTypes.CHECK_HOURS_OF_OPERATION,
      ContactFlowActionBlockTypes.CHECK_QUEUE_STATUS,
      ContactFlowActionBlockTypes.CHECK_STAFFING,
      ContactFlowActionBlockTypes.CONTACT_TAGS,
      ContactFlowActionBlockTypes.UNTAG_CONTACT,
      ContactFlowActionBlockTypes.GET_PROFILE,
      ContactFlowActionBlockTypes.CREATE_PROFILE,
      ContactFlowActionBlockTypes.UPDATE_PROFILE,
      ContactFlowActionBlockTypes.GET_PROFILE_OBJECT,
      ContactFlowActionBlockTypes.GET_CALCULATED_ATTRIBUTES,
      ContactFlowActionBlockTypes.ASSOCIATE_CONTACT_TO_PROFILE,
      ContactFlowActionBlockTypes.DISCONNECT_PARTICIPANT,
      ContactFlowActionBlockTypes.DISTRIBUTE_BY_PERCENTAGE,
      ContactFlowActionBlockTypes.END_FLOW_EXECUTION,
      ContactFlowActionBlockTypes.GET_CUSTOMER_INPUT,
      ContactFlowActionBlockTypes.GET_QUEUE_METRICS,
      ContactFlowActionBlockTypes.HOLD_CUSTOMER_OR_AGENT,
      ContactFlowActionBlockTypes.INVOKE_LAMBDA_FUNCTION,
      ContactFlowActionBlockTypes.INVOKE_FLOW_MODULE,
      ContactFlowActionBlockTypes.LOOP,
      ContactFlowActionBlockTypes.SET_CONTACT_ATTRIBUTES,
      ContactFlowActionBlockTypes.SET_FLOW_ATTRIBUTES,
      ContactFlowActionBlockTypes.SET_CUSTOMER_QUEUE_FLOW,
      ContactFlowActionBlockTypes.SET_DISCONNECT_FLOW,
      ContactFlowActionBlockTypes.SET_LOGGING_BEHAVIOR,
      ContactFlowActionBlockTypes.SET_RECORDING_AND_ANALYTICS_BEHAVIOR,
      ContactFlowActionBlockTypes.SET_ROUTING_CRITERIA,
      ContactFlowActionBlockTypes.SET_VOICE,
      ContactFlowActionBlockTypes.SET_WHISPER_FLOW,
      ContactFlowActionBlockTypes.SET_WORKING_QUEUE,
      ContactFlowActionBlockTypes.SHOW_VIEW,
      ContactFlowActionBlockTypes.STORE_CUSTOMER_INPUT,
      ContactFlowActionBlockTypes.TRANSFER_TO_AGENT,
      ContactFlowActionBlockTypes.TRANSFER_TO_FLOW,
      ContactFlowActionBlockTypes.TRANSFER_TO_PHONE_NUMBER,
      ContactFlowActionBlockTypes.TRANSFER_TO_QUEUE,
      ContactFlowActionBlockTypes.WAIT,
    ];
  }

  /**************************************************
   * Getters
   **************************************************/
  get id(): string {
    return this._id;
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
}
