import { PlayPromptActionBlock } from "@/contact-flow/entities/action-blocks/play-prompt-block";
import { ContactFlowActionBlockTypes } from "@/contact-flow/enums/action-blocks/contact-flow-action-block-types";
import { IContactFlowActionBlock } from "@/contact-flow/interfaces/action-blocks/contact-flow-action-block";
import { IContactFlowActionBlockMapper } from "@/contact-flow/interfaces/mapper/contact-flow-action-block-mapper";
import { ContactFlowType } from "@/contact-flow/enums/flows/contact-flow-types";
/**
 * Maps the contact flow block types to and from application action block types
 */
export class ContactFlowActionBlockMapper
  implements IContactFlowActionBlockMapper
{
  /**
   * Maps the contact flow block to application action block node
   *
   * @param id - The id of the action block
   * @param type - The type of the action block
   * @param parameters - The parameters of the action block
   * @param transitions - The transitions of the action block
   * @param parentContactFlowType - The contact flow type that uses this action block
   * @returns The application action block node
   */
  toActionBlockNode({
    id,
    type,
    parameters,
    transitions,
    parentContactFlowType,
  }: {
    id: string;
    type: string;
    parameters: Record<string, any>;
    transitions: Record<string, any>;
    parentContactFlowType: ContactFlowType;
  }): IContactFlowActionBlock {
    switch (type) {
      case ContactFlowActionBlockTypes.PLAY_PROMPT:
        return new PlayPromptActionBlock({
          id,
          type: ContactFlowActionBlockTypes.PLAY_PROMPT,
          parameters,
          transitions,
          parentContactFlowType,
        });
      default:
        throw new Error(`Action block type ${type} not supported`);
    }
  }
}
