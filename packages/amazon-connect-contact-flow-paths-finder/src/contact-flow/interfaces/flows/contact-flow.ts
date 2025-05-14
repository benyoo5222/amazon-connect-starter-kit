import { ContactFlowActionBlockTypes } from "../../enums/action-blocks/contact-flowaction-block-types";
import { ContactFlowType } from "../../enums/flows/contact-flow-types";
import { IContactFlowActionBlock } from "../action-blocks/contact-flow-action-block";

export interface IContactFlow {
  id: string;
  type: ContactFlowType;
  name: string;
  description?: string;
  actionBlocks: IContactFlowActionBlock[]; // Nodes from the Contact Flow
  supportedActionBlockTypes: ContactFlowActionBlockTypes[]; // List of Blocks that are supported by the Contact Flow type
}
