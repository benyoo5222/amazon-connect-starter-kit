import { ContactFlowActionBlockTypes } from "../../enums/action-blocks/contact-flowaction-block-types";

/**
 * Maps the action block type in the contact flow to the corresponding enum value
 */
export class ContactFlowActionBlockTypesMapper {
  static map(actionBlockType: string): ContactFlowActionBlockTypes {
    switch (actionBlockType) {
      case "MessageParticipant":
        return ContactFlowActionBlockTypes.PLAY_PROMPT;
      default:
        throw new Error(`Action block type ${actionBlockType} not supported`);
    }
  }
}
