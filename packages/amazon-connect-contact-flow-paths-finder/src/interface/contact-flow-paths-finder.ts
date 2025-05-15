import { ContactChannelTypes } from "@/contact-flow/enums/contact/contact-channel-types";
import { IContactFlowActionBlock } from "@/contact-flow/interfaces/action-blocks/contact-flow-action-block";
import { IContactFlow } from "@/contact-flow/interfaces/flows/contact-flow";

export interface IContactFlowPathsFinder {
  contactFlows: IContactFlow[];
  findPaths(): {
    [ContactChannelTypes.CHAT]: [IContactFlowActionBlock[]];
    [ContactChannelTypes.EMAIL]: [IContactFlowActionBlock[]];
    [ContactChannelTypes.VOICE]: [IContactFlowActionBlock[]];
    [ContactChannelTypes.TASK]: [IContactFlowActionBlock[]];
  };
}
