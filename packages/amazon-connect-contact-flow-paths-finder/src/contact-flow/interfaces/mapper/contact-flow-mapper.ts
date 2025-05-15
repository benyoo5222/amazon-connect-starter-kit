import { ContactFlowType } from "@/contact-flow/enums/flows/contact-flow-types";
import { IContactFlowActionBlock } from "@/contact-flow/interfaces/action-blocks/contact-flow-action-block";
import { IContactFlow } from "../flows/contact-flow";
import { ContactFlowStatus } from "@/contact-flow/enums/flows/contact-flow-status";
export interface IContactFlowMapper {
  toActionBlockNode({
    rawActionBlock,
    parentContactFlowType,
  }: {
    rawActionBlock: {
      Identifier: string;
      Type: string;
      Parameters: Record<string, any>;
      Transitions: Record<string, any>;
    };
    parentContactFlowType: ContactFlowType;
  }): IContactFlowActionBlock;
  getContactFlowStatus(contactflowStatus: string): ContactFlowStatus;
  toContactFlow({
    rawContactFlow,
    id,
  }: {
    rawContactFlow: string;
    id: string;
  }): IContactFlow;
}
