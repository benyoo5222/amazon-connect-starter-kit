import { IContactFlowActionBlock } from "@/contact-flow/interfaces/action-blocks/contact-flow-action-block";

export interface IContactFlowActionBlockMapper {
  toActionBlockNode(rawActionBlock: {
    id: string;
    type: string;
    parameters: Record<string, any>;
    transitions: Record<string, any>;
  }): IContactFlowActionBlock;
}
