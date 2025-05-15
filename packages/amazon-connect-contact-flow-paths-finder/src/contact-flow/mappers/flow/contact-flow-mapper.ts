import { ContactFlowType } from "@/contact-flow/enums/flows/contact-flow-types";
import { IContactFlow } from "@/contact-flow/interfaces/flows/contact-flow";
import { InboundContactFlow } from "@/contact-flow/entities/flows/inbound-flow";
import { PlayPromptActionBlock } from "@/contact-flow/entities/action-blocks/play-prompt-block";
import { IContactFlowActionBlock } from "@/contact-flow/interfaces/action-blocks/contact-flow-action-block";
import { ContactFlowActionBlockTypes } from "@/contact-flow/enums/action-blocks/contact-flow-action-block-types";
import { IContactFlowMapper } from "@/contact-flow/interfaces/mapper/contact-flow-mapper";
import { ContactFlowState } from "@/contact-flow/enums/flows/contact-flow-states";
import { ContactFlowStatus } from "@/contact-flow/enums/flows/contact-flow-status";
/**
 * Maps the raw contact flow to/from an application contact flow
 */
export class ContactFlowMapper implements IContactFlowMapper {
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
  }): IContactFlowActionBlock {
    switch (rawActionBlock.Type) {
      case ContactFlowActionBlockTypes.PLAY_PROMPT:
        return new PlayPromptActionBlock({
          id: rawActionBlock.Identifier,
          type: ContactFlowActionBlockTypes.PLAY_PROMPT,
          parameters: rawActionBlock.Parameters,
          transitions: rawActionBlock.Transitions,
          parentContactFlowType,
        });
      default:
        throw new Error(
          `Action block type ${rawActionBlock.Type} not supported`
        );
    }
  }

  /**
   * Maps the raw contact flow status to an application contact flow status
   *
   * @param contactflowStatus - The raw contact flow status
   * @returns The application contact flow status
   */
  getContactFlowStatus(contactflowStatus: string): ContactFlowStatus {
    switch (contactflowStatus) {
      case ContactFlowStatus.PUBLISHED:
        return ContactFlowStatus.PUBLISHED;
      case ContactFlowStatus.SAVED:
        return ContactFlowStatus.SAVED;
      default:
        throw new Error(
          `Contact flow status ${contactflowStatus} not supported`
        );
    }
  }

  /**
   * Maps the raw contact flow to an application contact flow entity
   *
   * @param rawContactFlow - The raw contact flow
   * @param id - The id of the contact flow
   * @returns The application contact flow entity
   */
  toContactFlow({
    rawContactFlow,
    id,
  }: {
    rawContactFlow: string;
    id: string;
  }): IContactFlow {
    const contactFlow = JSON.parse(rawContactFlow);

    const contactFlowStatus = this.getContactFlowStatus(
      contactFlow.Metadata.status
    );

    if (contactFlowStatus === ContactFlowStatus.SAVED) {
      throw new Error(
        "At the moment, only published contact flows are supported"
      );
    }

    switch (contactFlow.Metadata.type) {
      case ContactFlowType.INBOUND:
        const actionBlocks = contactFlow.Actions.map(
          (block: {
            Identifier: string;
            Type: string;
            Parameters: Record<string, any>;
            Transitions: Record<string, any>;
          }) =>
            this.toActionBlockNode({
              rawActionBlock: block,
              parentContactFlowType: ContactFlowType.INBOUND,
            })
        );

        return new InboundContactFlow({
          id,
          name: contactFlow.Metadata.name,
          description: contactFlow.Metadata.description,
          actionBlocks,
          rawContactFlow,
          status: ContactFlowStatus.PUBLISHED,
          state: ContactFlowState.ACTIVE, // Assuming that the contact flow is active
        });
      default:
        throw new Error(`Contact flow type ${contactFlow.Type} not supported`);
    }
  }
}
