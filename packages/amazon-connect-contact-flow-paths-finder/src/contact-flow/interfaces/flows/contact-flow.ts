import { ContactFlowActionBlockTypes } from "@/contact-flow/enums/action-blocks/contact-flow-action-block-types";
import { ContactFlowType } from "@/contact-flow/enums/flows/contact-flow-types";
import { IContactFlowActionBlock } from "@/contact-flow/interfaces/action-blocks/contact-flow-action-block";
import { ContactChannelTypes } from "@/contact-flow/enums/contact/contact-channel-types";

export interface IContactFlow {
  id: string;
  type: ContactFlowType;
  name: string;
  description?: string;
  actionBlocks: IContactFlowActionBlock[]; // Nodes from the Contact Flow
  supportedActionBlockTypes: ContactFlowActionBlockTypes[]; // List of Blocks that are supported by the Contact Flow type
  supportedContactChannelTypes: ContactChannelTypes[]; // List of Contact Channel Types that are supported by the Contact Flow type
  rawContactFlow: string; // Contact Flow JSON as a string
  areActionBlocksSupported(): boolean;
  isContactChannelTypeSupported(
    contactChannelType: ContactChannelTypes
  ): boolean;
}
