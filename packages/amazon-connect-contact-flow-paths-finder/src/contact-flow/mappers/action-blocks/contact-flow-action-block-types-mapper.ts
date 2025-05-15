import { ContactFlowActionBlockTypes } from "@/contact-flow/enums/action-blocks/contact-flow-action-block-types";

/**
 * Maps the contact flow block types to and from application action block types
 */
export class ContactFlowActionBlockTypesMapper {
  /**
   * Maps the contact flow block types to application action block types
  
   * @param contactFlowActionBlockType - The contact flow block type
   * @returns The application action block type
   */
  static toActionBlockTypes(
    contactFlowActionBlockType: string
  ): ContactFlowActionBlockTypes {
    switch (contactFlowActionBlockType) {
      case "MessageParticipant":
        return ContactFlowActionBlockTypes.PLAY_PROMPT;
      default:
        throw new Error(
          `Action block type ${contactFlowActionBlockType} not supported`
        );
    }
  }
}
