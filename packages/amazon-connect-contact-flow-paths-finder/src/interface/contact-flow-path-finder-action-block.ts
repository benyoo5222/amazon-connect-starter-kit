import { IContactFlowActionBlock } from "@/contact-flow/interfaces/action-blocks/contact-flow-action-block";

export interface IContactFlowPathFinderActionBlock {
  actionBlock: IContactFlowActionBlock;
  nextActionBlockId?: string;
  currentPath: IContactFlowPathFinderActionBlock[];
}
