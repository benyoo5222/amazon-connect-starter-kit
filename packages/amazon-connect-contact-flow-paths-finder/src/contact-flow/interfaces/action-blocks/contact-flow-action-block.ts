import { ContactFlowActionBlockTypes } from "@/contact-flow/enums/action-blocks/contact-flow-action-block-types";

export interface IContactFlowActionBlock {
  id: string;
  type: ContactFlowActionBlockTypes;
  parameters: Record<string, any>;
  transitions: Record<string, any>;
}
