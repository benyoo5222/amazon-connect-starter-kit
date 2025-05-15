import { ContactFlowActionBlockTypes } from "@/contact-flow/enums/action-blocks/contact-flow-action-block-types";
import { ContactFlowType } from "@/contact-flow/enums/flows/contact-flow-types";
import { IContactFlowActionBlock } from "@/contact-flow/interfaces/action-blocks/contact-flow-action-block";
import { ContactChannelTypes } from "@/contact-flow/enums/contact/contact-channel-types";
import { ContactFlowStatus } from "@/contact-flow/enums/flows/contact-flow-status";
import { ContactFlowState } from "@/contact-flow/enums/flows/contact-flow-states";
import { ContactFlow } from "./contact-flow";

export class InboundContactFlow extends ContactFlow {
  constructor({
    id,
    name,
    description,
    actionBlocks,
    rawContactFlow,
    status,
    state,
  }: {
    id: string;
    name: string;
    description: string;
    actionBlocks: IContactFlowActionBlock[];
    rawContactFlow: string;
    status: ContactFlowStatus;
    state: ContactFlowState;
  }) {
    const supportedActionBlockTypes = [
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
    const supportedContactChannelTypes = [
      ContactChannelTypes.VOICE,
      ContactChannelTypes.CHAT,
      ContactChannelTypes.EMAIL,
      ContactChannelTypes.TASK,
    ];

    super({
      id,
      type: ContactFlowType.INBOUND,
      name,
      description,
      actionBlocks,
      supportedActionBlockTypes,
      supportedContactChannelTypes,
      rawContactFlow,
      status,
      state,
    });
  }
}
