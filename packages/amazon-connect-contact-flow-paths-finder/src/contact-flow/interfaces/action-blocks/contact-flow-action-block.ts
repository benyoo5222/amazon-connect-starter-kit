import { ContactFlowActionBlockTypes } from "../../enums/action-blocks/contact-flowaction-block-types";

export interface IContactFlowActionBlock {
  id: string;
  type: ContactFlowActionBlockTypes;
  parameters: Record<string, any>;
  transitions: Record<string, any>;
}
