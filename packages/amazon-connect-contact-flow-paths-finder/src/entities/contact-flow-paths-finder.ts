import { ContactChannelTypes } from "@/contact-flow/enums/contact/contact-channel-types";
import { IContactFlow } from "@/contact-flow/interfaces/flows/contact-flow";
import { IContactFlowPathsFinder } from "@/interface/contact-flow-paths-finder";
import { IContactFlowPathFinderActionBlock } from "@/interface/contact-flow-path-finder-action-block";
import { IContactFlowActionBlock } from "@/contact-flow/interfaces/action-blocks/contact-flow-action-block";

export class ContactFlowPathsFinder implements IContactFlowPathsFinder {
  private _contactFlows: IContactFlow[];
  private _rootContactFlowId: string;
  private _mapOfActionBlockIdsToActionBlocks: Record<
    string,
    IContactFlowActionBlock
  >;
  private _pathStack: IContactFlowPathFinderActionBlock[];
  private _allPaths: {
    [ContactChannelTypes.CHAT]: [IContactFlowPathFinderActionBlock[] | []];
    [ContactChannelTypes.EMAIL]: [IContactFlowPathFinderActionBlock[] | []];
    [ContactChannelTypes.VOICE]: [IContactFlowPathFinderActionBlock[] | []];
    [ContactChannelTypes.TASK]: [IContactFlowPathFinderActionBlock[] | []];
  };

  constructor(contactFlows: IContactFlow[], rootContactFlowId: string) {
    if (contactFlows.length === 0) {
      throw new Error("Contact flows are required");
    }

    if (!rootContactFlowId) {
      throw new Error("Root contact flow id is required");
    }

    if (!this._doesRootContactFlowExist({ contactFlows, rootContactFlowId })) {
      throw new Error("Root contact flow id is invalid");
    }

    this._contactFlows = contactFlows;
    this._rootContactFlowId = rootContactFlowId;
    this._mapOfActionBlockIdsToActionBlocks =
      this._buildMapOfActionBlockIdsToActionBlocks(contactFlows);
    this._pathStack = [];
    this._allPaths = {
      [ContactChannelTypes.CHAT]: [[]],
      [ContactChannelTypes.EMAIL]: [[]],
      [ContactChannelTypes.VOICE]: [[]],
      [ContactChannelTypes.TASK]: [[]],
    };
  }

  /**************************************************
   * Private Methods
   **************************************************/
  /**
   * Checks if the root contact flow exists
   * @returns True if the root contact flow exists, false otherwise
   */
  _doesRootContactFlowExist({
    contactFlows,
    rootContactFlowId,
  }: {
    contactFlows: IContactFlow[];
    rootContactFlowId: string;
  }): boolean {
    return contactFlows.some(
      (contactFlow) => contactFlow.id === rootContactFlowId
    );
  }

  /**
   * Finds the root contact flow
   * @returns The root contact flow
   */
  _findRootContactFlow({
    contactFlows,
    rootContactFlowId,
  }: {
    contactFlows: IContactFlow[];
    rootContactFlowId: string;
  }): IContactFlow {
    const rootContactFlow = contactFlows.find(
      (contactFlow) => contactFlow.id === rootContactFlowId
    );

    if (!rootContactFlow) {
      throw new Error("Root contact flow not found");
    }

    return rootContactFlow;
  }

  /**
   * Builds a map of action block ids to action blocks
   * @returns The map of action block ids to action blocks
   */
  _buildMapOfActionBlockIdsToActionBlocks(
    contactFlows: IContactFlow[]
  ): Record<string, IContactFlowActionBlock> {
    return contactFlows.reduce((acc, contactFlow) => {
      return {
        ...acc,
        ...contactFlow.actionBlocks.reduce(
          (blockAcc, actionBlock) => ({
            ...blockAcc,
            [actionBlock.id]: actionBlock,
          }),
          {}
        ),
      };
    }, {});
  }

  /**
   * Finds an action block by its id
   * @returns The action block
   */
  _findActionBlock({
    actionBlockId,
  }: {
    actionBlockId: string;
  }): IContactFlowActionBlock {
    return this._mapOfActionBlockIdsToActionBlocks[actionBlockId];
  }

  /**
   * Create ContactFlowPathFinderActionBlock
   */
  _createContactFlowPathFinderActionBlock(
    actionBlock: IContactFlowActionBlock,
    currentPath: IContactFlowPathFinderActionBlock[],
    nextActionBlockId?: string
  ): IContactFlowPathFinderActionBlock {
    return {
      actionBlock,
      currentPath,
      nextActionBlockId,
    };
  }

  /**
   * Handles the next action block
   */
  _createPathsPerContactChannelType(
    contactChannelType: ContactChannelTypes,
    rootContactFlowPathFinderActionBlock: IContactFlowPathFinderActionBlock
  ): void {
    this._pathStack.push(rootContactFlowPathFinderActionBlock);

    while (this._pathStack.length > 0) {
      // Pop the action block from the stack
      const contactFlowPathFinderActionBlock = this._pathStack.pop();

      // If the action block is not found, no more actions to handle
      if (!contactFlowPathFinderActionBlock) {
        return;
      }

      // If the action block has a next action block id, find the next action block
      // And then push only the next action block on the stack
      if (contactFlowPathFinderActionBlock.nextActionBlockId) {
        const nextActionBlock = this._findActionBlock({
          actionBlockId: contactFlowPathFinderActionBlock.nextActionBlockId,
        });

        const parentContactFlowPathFinderActionBlock =
          contactFlowPathFinderActionBlock;

        // New blocks will go on the stack
        const nextContactFlowPathFinderActionBlock =
          this._createContactFlowPathFinderActionBlock(nextActionBlock, [
            ...parentContactFlowPathFinderActionBlock.currentPath,
            parentContactFlowPathFinderActionBlock,
          ]);

        this._pathStack.push(nextContactFlowPathFinderActionBlock);

        continue;
      }

      // If there are no transitions, the current path is complete, add it to the all paths
      // For the current contact channel type
      if (
        Object.keys(contactFlowPathFinderActionBlock.actionBlock.transitions)
          .length === 0
      ) {
        // If the first path is empty, add the current path to the all paths
        if (
          this._allPaths[contactChannelType].length === 1 &&
          this._allPaths[contactChannelType][0].length === 0
        ) {
          this._allPaths[contactChannelType][0] = [
            ...contactFlowPathFinderActionBlock.currentPath,
            contactFlowPathFinderActionBlock,
          ];
          continue;
        }

        // Current path is complete, add it to the all paths
        this._allPaths[contactChannelType].push([
          ...contactFlowPathFinderActionBlock.currentPath,
          contactFlowPathFinderActionBlock,
        ]);
        continue;
      }

      // Else, using the current action block, find all the next action blocks
      // using the transitions property and repush the current action block
      // per each next action block
      const parentContactFlowPathFinderActionBlock =
        contactFlowPathFinderActionBlock;

      // Allow the contact flow action block to determine what are the next blocks
      const nextActionBlockIds =
        parentContactFlowPathFinderActionBlock.actionBlock.getNextActionBlockIds(
          contactChannelType
        );

      if (nextActionBlockIds.length === 0) {
        // Current path is complete, add it to the all paths
        this._allPaths[contactChannelType].push(
          contactFlowPathFinderActionBlock.currentPath
        );
        continue;
      }

      const nextActionBlocks = nextActionBlockIds.map((nextActionBlockId) =>
        this._findActionBlock({
          actionBlockId: nextActionBlockId,
        })
      );

      const areThereInvalidNextActionBlocks = nextActionBlocks.some(
        (nextActionBlock) => {
          if (!nextActionBlock) {
            return true;
          }

          return false;
        }
      );

      if (areThereInvalidNextActionBlocks) {
        console.log("Cannot find next action block", nextActionBlockIds);

        throw new Error("Cannot find next action block");
      }

      // Recreate the current action block for each next action block
      const parentContactFlowPathFinderActionBlockWithNextActionBlockIds =
        nextActionBlocks.map((nextActionBlock) =>
          this._createContactFlowPathFinderActionBlock(
            parentContactFlowPathFinderActionBlock.actionBlock,
            parentContactFlowPathFinderActionBlock.currentPath,
            nextActionBlock.id
          )
        );

      // Re-push the current action block with the next action block ids
      this._pathStack.push(
        ...parentContactFlowPathFinderActionBlockWithNextActionBlockIds
      );
    }
  }

  /**************************************************
   * Public Methods
   **************************************************/
  /**
   * Finds all the paths a contact goes through in the contact flow(s)
   * @returns The paths of the contact flow
   */
  findPaths(): {
    [ContactChannelTypes.CHAT]: [IContactFlowPathFinderActionBlock[] | []];
    [ContactChannelTypes.EMAIL]: [IContactFlowPathFinderActionBlock[] | []];
    [ContactChannelTypes.VOICE]: [IContactFlowPathFinderActionBlock[] | []];
    [ContactChannelTypes.TASK]: [IContactFlowPathFinderActionBlock[] | []];
  } {
    const rootContactFlow = this._findRootContactFlow({
      contactFlows: this._contactFlows,
      rootContactFlowId: this._rootContactFlowId,
    });

    const startingActionBlock = rootContactFlow.getStartingActionBlock();

    const startingContactFlowPathFinderActionBlock =
      this._createContactFlowPathFinderActionBlock(startingActionBlock, []);

    // Per contact channel type, create the paths
    this._createPathsPerContactChannelType(
      ContactChannelTypes.VOICE,
      startingContactFlowPathFinderActionBlock
    );
    this._createPathsPerContactChannelType(
      ContactChannelTypes.EMAIL,
      startingContactFlowPathFinderActionBlock
    );
    this._createPathsPerContactChannelType(
      ContactChannelTypes.CHAT,
      startingContactFlowPathFinderActionBlock
    );
    this._createPathsPerContactChannelType(
      ContactChannelTypes.TASK,
      startingContactFlowPathFinderActionBlock
    );

    return this._allPaths;
  }

  /**************************************************
   * Getters
   **************************************************/
  get contactFlows(): IContactFlow[] {
    return this._contactFlows;
  }

  get rootContactFlowId(): string {
    return this._rootContactFlowId;
  }

  get mapOfActionBlockIdsToActionBlocks(): Record<
    string,
    IContactFlowActionBlock
  > {
    return this._mapOfActionBlockIdsToActionBlocks;
  }
}
