import { IContactFlowActionBlock } from "@/contact-flow/interfaces/action-blocks/contact-flow-action-block";
import { ContactFlowNextActionBlockInfo } from "@/contact-flow/types/action-blocks/contact-flow-next-action-info";

export interface IContactFlowPathFinderActionBlock {
  actionBlock: IContactFlowActionBlock;
  nextActionBlock?: ContactFlowNextActionBlockInfo;
  currentPath: IContactFlowPathFinderActionBlock[];
}
