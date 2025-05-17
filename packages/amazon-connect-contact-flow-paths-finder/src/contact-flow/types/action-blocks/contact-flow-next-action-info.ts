import { ContactFlowNextActionBlockConditionType } from "@/contact-flow/enums/action-blocks/contact-flow-action-block-types";

import { ContactFlowNextActionBlockReason } from "@/contact-flow/enums/action-blocks/contact-flow-action-block-types";

export type ContactFlowNextActionBlockInfo = {
  id: string;
  reason: ContactFlowNextActionBlockReason;
  error?: {
    type: string;
  };
  condition_met?: {
    conditionType: ContactFlowNextActionBlockConditionType;
    conditionValue: string;
  };
};
