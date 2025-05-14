/**
 * This enum is used to identify the type of contact flow.
 */
export enum ContactFlowType {
  INBOUND = "contactFlow",
  CUSTOMER_QUEUE = "customerQueue",
  CUSTOMER_HOLD = "customerHold",
  CUSTOMER_WHISPER = "customerWhisper",
  OUTBOUND_WHISPER = "outboundWhisper",
  AGENT_HOLD = "agentHold",
  AGENT_WHISPER = "agentWhisper",
  TRANSFER_TO_AGENT = "agentTransfer",
  TRANSFER_TO_QUEUE = "queueTransfer",
}
