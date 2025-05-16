import { ContactChannelTypes } from "@/contact-flow/enums/contact/contact-channel-types";
import { IContactFlow } from "@/contact-flow/interfaces/flows/contact-flow";
import { IContactFlowPathFinderActionBlock } from "./contact-flow-path-finder-action-block";
import { IContactFlowActionBlock } from "@/contact-flow/interfaces/action-blocks/contact-flow-action-block";

export interface IContactFlowPathsFinder {
  contactFlows: IContactFlow[];
  rootContactFlowId: string;
  mapOfActionBlockIdsToActionBlocks: Record<string, IContactFlowActionBlock>;
  findPaths(): {
    [ContactChannelTypes.CHAT]: [IContactFlowPathFinderActionBlock[] | []];
    [ContactChannelTypes.EMAIL]: [IContactFlowPathFinderActionBlock[] | []];
    [ContactChannelTypes.VOICE]: [IContactFlowPathFinderActionBlock[] | []];
    [ContactChannelTypes.TASK]: [IContactFlowPathFinderActionBlock[] | []];
  };
}
