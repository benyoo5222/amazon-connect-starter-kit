import { ContactFlowActionBlockTypes } from "@/contact-flow/enums/action-blocks/contact-flow-action-block-types";
import { ContactChannelTypes } from "@/contact-flow/enums/contact/contact-channel-types";
import { ContactFlowType } from "@/contact-flow/enums/flows/contact-flow-types";

export interface IContactFlowActionBlock {
  id: string;
  type: ContactFlowActionBlockTypes;
  parameters: Record<string, any>;
  transitions: Record<string, any>;
  supportedContactFlowTypes: ContactFlowType[];
  supportedContactChannels: ContactChannelTypes[];
  parentContactFlowType: ContactFlowType;
  parentContactFlowId: string;
  isContactChannelTypeSupported(
    contactChannelType: ContactChannelTypes
  ): boolean;
  getNextActionBlockIds(contactChannelType: ContactChannelTypes): string[];
}
