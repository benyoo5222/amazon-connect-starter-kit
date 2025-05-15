import { ContactFlowActionBlockTypes } from "@/contact-flow/enums/action-blocks/contact-flow-action-block-types";
import { ContactFlowType } from "@/contact-flow/enums/flows/contact-flow-types";
import { IContactFlowActionBlock } from "@/contact-flow/interfaces/action-blocks/contact-flow-action-block";

export interface IContactFlow {
  id: string;
  type: ContactFlowType;
  name: string;
  description?: string;
  actionBlocks: IContactFlowActionBlock[]; // Nodes from the Contact Flow
  supportedActionBlockTypes: ContactFlowActionBlockTypes[]; // List of Blocks that are supported by the Contact Flow type
}
