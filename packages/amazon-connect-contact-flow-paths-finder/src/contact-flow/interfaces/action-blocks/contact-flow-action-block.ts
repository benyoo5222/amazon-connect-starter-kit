import {
  ContactFlowActionBlockTypes,
  ContactFlowNextActionBlockConditionType,
  ContactFlowNextActionBlockReason,
} from "@/contact-flow/enums/action-blocks/contact-flow-action-block-types";
import { ContactChannelTypes } from "@/contact-flow/enums/contact/contact-channel-types";
import { ContactFlowType } from "@/contact-flow/enums/flows/contact-flow-types";
import { ContactFlowNextActionBlockInfo } from "@/contact-flow/types/action-blocks/contact-flow-next-action-info";

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
  getNextActionBlocksInfo(
    contactChannelType: ContactChannelTypes
  ): ContactFlowNextActionBlockInfo[];
  createNextActionBlockInfo({
    id,
    reason,
    error,
    condition_met,
  }: {
    id: string;
    reason: ContactFlowNextActionBlockReason;
    error?: {
      type: string;
    };
    condition_met?: {
      conditionType: ContactFlowNextActionBlockConditionType;
      conditionValue: string;
    };
  }): ContactFlowNextActionBlockInfo;
}
