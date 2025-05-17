import { ContactFlowMapper } from "@/contact-flow/mappers/flow/contact-flow-mapper";
import { ContactFlowPathsFinder } from "@/entities/contact-flow-paths-finder";
import { beforeEach, describe, expect, it } from "@jest/globals";
import { ContactChannelTypes } from "@/contact-flow/enums/contact/contact-channel-types";
import { IContactFlowPathFinderActionBlock } from "@/interface/contact-flow-path-finder-action-block";

describe("ContactFlowPathsFinder", () => {
  function getBlockIdAndTypes(paths: {
    CHAT: [IContactFlowPathFinderActionBlock[] | []];
    EMAIL: [IContactFlowPathFinderActionBlock[] | []];
    VOICE: [IContactFlowPathFinderActionBlock[] | []];
    TASK: [IContactFlowPathFinderActionBlock[] | []];
  }) {
    return Object.entries(paths).reduce((acc, [contactChannelType, paths]) => {
      return {
        ...acc,
        [contactChannelType]: paths.map((path) => {
          return path.map((block) => {
            return {
              id: block.actionBlock.id,
              type: block.actionBlock.type,
            };
          });
        }),
      };
    }, {});
  }

  describe("ContactFlowPathsFinder for a single contact flow [Inbound] with TTS and Disconnect", () => {
    let contactFlowPathsFinder: ContactFlowPathsFinder;

    beforeEach(() => {
      const jsonContactFlow = {
        Version: "2019-10-30",
        StartAction: "9f072615-ad95-43eb-a4ef-01af541dd6db",
        Metadata: {
          entryPointPosition: {
            x: 40,
            y: 40,
          },
          ActionMetadata: {
            "120b5bdb-cb48-4e2f-a355-842b12866590": {
              position: {
                x: 456.8,
                y: 115.2,
              },
            },
            "9f072615-ad95-43eb-a4ef-01af541dd6db": {
              position: {
                x: 139.2,
                y: 126.4,
              },
            },
          },
          Annotations: [],
          name: "test2",
          description: "",
          type: "contactFlow",
          status: "published",
          hash: {},
        },
        Actions: [
          {
            Parameters: {},
            Identifier: "120b5bdb-cb48-4e2f-a355-842b12866590",
            Type: "DisconnectParticipant",
            Transitions: {},
          },
          {
            Parameters: {
              Text: "Hello",
            },
            Identifier: "9f072615-ad95-43eb-a4ef-01af541dd6db",
            Type: "MessageParticipant",
            Transitions: {
              NextAction: "120b5bdb-cb48-4e2f-a355-842b12866590",
              Errors: [
                {
                  NextAction: "120b5bdb-cb48-4e2f-a355-842b12866590",
                  ErrorType: "NoMatchingError",
                },
              ],
            },
          },
        ],
      };

      const contactFlowMapper = new ContactFlowMapper();
      const contactFlow = contactFlowMapper.toContactFlow({
        rawContactFlow: JSON.stringify(jsonContactFlow),
        id: "1234",
      });

      contactFlowPathsFinder = new ContactFlowPathsFinder(
        [contactFlow],
        contactFlow.id
      );
    });

    it("should find all the paths a contact goes through in the contact flow(s)", () => {
      const paths = contactFlowPathsFinder.findPaths();

      const blockIdsPerContactChannelType = getBlockIdAndTypes(paths);

      expect(blockIdsPerContactChannelType).toEqual({
        [ContactChannelTypes.VOICE]: [
          [
            {
              id: "1234-9f072615-ad95-43eb-a4ef-01af541dd6db",
              type: "MessageParticipant",
            },
            {
              id: "1234-120b5bdb-cb48-4e2f-a355-842b12866590",
              type: "DisconnectParticipant",
            },
          ],
          [
            {
              id: "1234-9f072615-ad95-43eb-a4ef-01af541dd6db",
              type: "MessageParticipant",
            },
            {
              id: "1234-120b5bdb-cb48-4e2f-a355-842b12866590",
              type: "DisconnectParticipant",
            },
          ],
        ],
        [ContactChannelTypes.CHAT]: [
          [
            {
              id: "1234-9f072615-ad95-43eb-a4ef-01af541dd6db",
              type: "MessageParticipant",
            },
            {
              id: "1234-120b5bdb-cb48-4e2f-a355-842b12866590",
              type: "DisconnectParticipant",
            },
          ],
          [
            {
              id: "1234-9f072615-ad95-43eb-a4ef-01af541dd6db",
              type: "MessageParticipant",
            },
            {
              id: "1234-120b5bdb-cb48-4e2f-a355-842b12866590",
              type: "DisconnectParticipant",
            },
          ],
        ],
        [ContactChannelTypes.EMAIL]: [
          [
            {
              id: "1234-9f072615-ad95-43eb-a4ef-01af541dd6db",
              type: "MessageParticipant",
            },
            {
              id: "1234-120b5bdb-cb48-4e2f-a355-842b12866590",
              type: "DisconnectParticipant",
            },
          ],
        ],
        [ContactChannelTypes.TASK]: [
          [
            {
              id: "1234-9f072615-ad95-43eb-a4ef-01af541dd6db",
              type: "MessageParticipant",
            },
            {
              id: "1234-120b5bdb-cb48-4e2f-a355-842b12866590",
              type: "DisconnectParticipant",
            },
          ],
          [
            {
              id: "1234-9f072615-ad95-43eb-a4ef-01af541dd6db",
              type: "MessageParticipant",
            },
            {
              id: "1234-120b5bdb-cb48-4e2f-a355-842b12866590",
              type: "DisconnectParticipant",
            },
          ],
        ],
      });
    });
  });

  describe("ContactFlowPathsFinder for a single contact flow [Inbound] with Prompt Audio and Disconnect", () => {
    let contactFlowPathsFinder: ContactFlowPathsFinder;

    beforeEach(() => {
      const jsonContactFlow = {
        Version: "2019-10-30",
        StartAction: "9f072615-ad95-43eb-a4ef-01af541dd6db",
        Metadata: {
          entryPointPosition: {
            x: 40,
            y: 40,
          },
          ActionMetadata: {
            "120b5bdb-cb48-4e2f-a355-842b12866590": {
              position: {
                x: 456.8,
                y: 115.2,
              },
            },
            "9f072615-ad95-43eb-a4ef-01af541dd6db": {
              position: {
                x: 139.2,
                y: 126.4,
              },
              parameters: {
                PromptId: {
                  displayName: "Beep.wav",
                },
              },
              promptName: "Beep.wav",
            },
          },
          Annotations: [],
          name: "test2",
          description: "",
          type: "contactFlow",
          status: "published",
          hash: {},
        },
        Actions: [
          {
            Parameters: {},
            Identifier: "120b5bdb-cb48-4e2f-a355-842b12866590",
            Type: "DisconnectParticipant",
            Transitions: {},
          },
          {
            Parameters: {
              PromptId:
                "arn:aws:connect:us-east-1:183518158122:instance/e9855c40-2f70-47e3-8318-7f03b2792f74/prompt/f94c95bc-25b4-4735-90ef-68408c5f5b92",
            },
            Identifier: "9f072615-ad95-43eb-a4ef-01af541dd6db",
            Type: "MessageParticipant",
            Transitions: {
              NextAction: "120b5bdb-cb48-4e2f-a355-842b12866590",
              Errors: [
                {
                  NextAction: "120b5bdb-cb48-4e2f-a355-842b12866590",
                  ErrorType: "NoMatchingError",
                },
              ],
            },
          },
        ],
      };

      const contactFlowMapper = new ContactFlowMapper();
      const contactFlow = contactFlowMapper.toContactFlow({
        rawContactFlow: JSON.stringify(jsonContactFlow),
        id: "1234",
      });

      contactFlowPathsFinder = new ContactFlowPathsFinder(
        [contactFlow],
        contactFlow.id
      );
    });

    it("should find all the paths a contact goes through except for chat and task channels", () => {
      const paths = contactFlowPathsFinder.findPaths();

      const blockIdsPerContactChannelType = getBlockIdAndTypes(paths);

      expect(blockIdsPerContactChannelType).toEqual({
        [ContactChannelTypes.VOICE]: [
          [
            {
              id: "1234-9f072615-ad95-43eb-a4ef-01af541dd6db",
              type: "MessageParticipant",
            },
            {
              id: "1234-120b5bdb-cb48-4e2f-a355-842b12866590",
              type: "DisconnectParticipant",
            },
          ],
          [
            {
              id: "1234-9f072615-ad95-43eb-a4ef-01af541dd6db",
              type: "MessageParticipant",
            },
            {
              id: "1234-120b5bdb-cb48-4e2f-a355-842b12866590",
              type: "DisconnectParticipant",
            },
          ],
        ],

        [ContactChannelTypes.CHAT]: [
          [
            {
              id: "1234-9f072615-ad95-43eb-a4ef-01af541dd6db",
              type: "MessageParticipant",
            },
            {
              id: "1234-120b5bdb-cb48-4e2f-a355-842b12866590",
              type: "DisconnectParticipant",
            },
          ],
        ],
        [ContactChannelTypes.EMAIL]: [
          [
            {
              id: "1234-9f072615-ad95-43eb-a4ef-01af541dd6db",
              type: "MessageParticipant",
            },
            {
              id: "1234-120b5bdb-cb48-4e2f-a355-842b12866590",
              type: "DisconnectParticipant",
            },
          ],
        ],
        [ContactChannelTypes.TASK]: [
          [
            {
              id: "1234-9f072615-ad95-43eb-a4ef-01af541dd6db",
              type: "MessageParticipant",
            },
            {
              id: "1234-120b5bdb-cb48-4e2f-a355-842b12866590",
              type: "DisconnectParticipant",
            },
          ],
        ],
      });
    });
  });

  describe("ContactFlowPathsFinder for a single contact flow [Inbound] with S3 Audio and Disconnect", () => {
    let contactFlowPathsFinder: ContactFlowPathsFinder;

    beforeEach(() => {
      const jsonContactFlow = {
        Version: "2019-10-30",
        StartAction: "test",
        Metadata: {
          entryPointPosition: {
            x: 40,
            y: 40,
          },
          ActionMetadata: {
            "120b5bdb-cb48-4e2f-a355-842b12866590": {
              position: {
                x: 456.8,
                y: 115.2,
              },
            },
            test: {
              position: {
                x: 138.4,
                y: 125.6,
              },
              isFriendlyName: true,
            },
          },
          Annotations: [],
          name: "test2",
          description: "",
          type: "contactFlow",
          status: "published",
          hash: {},
        },
        Actions: [
          {
            Parameters: {},
            Identifier: "120b5bdb-cb48-4e2f-a355-842b12866590",
            Type: "DisconnectParticipant",
            Transitions: {},
          },
          {
            Parameters: {
              Media: {
                Uri: "$['Attributes']['Language']/$['Attributes']['LOB']/1.wav",
                SourceType: "S3",
                MediaType: "Audio",
              },
            },
            Identifier: "test",
            Type: "MessageParticipant",
            Transitions: {
              NextAction: "120b5bdb-cb48-4e2f-a355-842b12866590",
              Errors: [
                {
                  NextAction: "120b5bdb-cb48-4e2f-a355-842b12866590",
                  ErrorType: "NoMatchingError",
                },
              ],
            },
          },
        ],
      };

      const contactFlowMapper = new ContactFlowMapper();
      const contactFlow = contactFlowMapper.toContactFlow({
        rawContactFlow: JSON.stringify(jsonContactFlow),
        id: "1234",
      });

      contactFlowPathsFinder = new ContactFlowPathsFinder(
        [contactFlow],
        contactFlow.id
      );
    });

    it("should find all the paths a contact goes through except for chat and task channels", () => {
      const paths = contactFlowPathsFinder.findPaths();

      const blockIdsPerContactChannelType = getBlockIdAndTypes(paths);

      expect(blockIdsPerContactChannelType).toEqual({
        [ContactChannelTypes.VOICE]: [
          [
            {
              id: "1234-test",
              type: "MessageParticipant",
            },
            {
              id: "1234-120b5bdb-cb48-4e2f-a355-842b12866590",
              type: "DisconnectParticipant",
            },
          ],
          [
            {
              id: "1234-test",
              type: "MessageParticipant",
            },
            {
              id: "1234-120b5bdb-cb48-4e2f-a355-842b12866590",
              type: "DisconnectParticipant",
            },
          ],
        ],

        [ContactChannelTypes.CHAT]: [
          [
            {
              id: "1234-test",
              type: "MessageParticipant",
            },
            {
              id: "1234-120b5bdb-cb48-4e2f-a355-842b12866590",
              type: "DisconnectParticipant",
            },
          ],
        ],
        [ContactChannelTypes.EMAIL]: [
          [
            {
              id: "1234-test",
              type: "MessageParticipant",
            },
            {
              id: "1234-120b5bdb-cb48-4e2f-a355-842b12866590",
              type: "DisconnectParticipant",
            },
          ],
        ],
        [ContactChannelTypes.TASK]: [
          [
            {
              id: "1234-test",
              type: "MessageParticipant",
            },
            {
              id: "1234-120b5bdb-cb48-4e2f-a355-842b12866590",
              type: "DisconnectParticipant",
            },
          ],
        ],
      });
    });
  });

  describe("ContactFlowPathsFinder for a single contact flow [Inbound] with SSML and Disconnect", () => {
    let contactFlowPathsFinder: ContactFlowPathsFinder;

    beforeEach(() => {
      const jsonContactFlow = {
        Version: "2019-10-30",
        StartAction: "test",
        Metadata: {
          entryPointPosition: {
            x: 40,
            y: 40,
          },
          ActionMetadata: {
            "120b5bdb-cb48-4e2f-a355-842b12866590": {
              position: {
                x: 456.8,
                y: 115.2,
              },
            },
            test: {
              position: {
                x: 138.4,
                y: 125.6,
              },
              isFriendlyName: true,
            },
          },
          Annotations: [],
          name: "test2",
          description: "",
          type: "contactFlow",
          status: "published",
          hash: {},
        },
        Actions: [
          {
            Parameters: {},
            Identifier: "120b5bdb-cb48-4e2f-a355-842b12866590",
            Type: "DisconnectParticipant",
            Transitions: {},
          },
          {
            Parameters: {
              SSML: "< speak>Hello</speak>",
            },
            Identifier: "test",
            Type: "MessageParticipant",
            Transitions: {
              NextAction: "120b5bdb-cb48-4e2f-a355-842b12866590",
              Errors: [
                {
                  NextAction: "120b5bdb-cb48-4e2f-a355-842b12866590",
                  ErrorType: "NoMatchingError",
                },
              ],
            },
          },
        ],
      };

      const contactFlowMapper = new ContactFlowMapper();
      const contactFlow = contactFlowMapper.toContactFlow({
        rawContactFlow: JSON.stringify(jsonContactFlow),
        id: "1234",
      });

      contactFlowPathsFinder = new ContactFlowPathsFinder(
        [contactFlow],
        contactFlow.id
      );
    });

    it("should find all the paths a contact goes through", () => {
      const paths = contactFlowPathsFinder.findPaths();

      const blockIdsPerContactChannelType = getBlockIdAndTypes(paths);

      expect(blockIdsPerContactChannelType).toEqual({
        [ContactChannelTypes.VOICE]: [
          [
            {
              id: "1234-test",
              type: "MessageParticipant",
            },
            {
              id: "1234-120b5bdb-cb48-4e2f-a355-842b12866590",
              type: "DisconnectParticipant",
            },
          ],
          [
            {
              id: "1234-test",
              type: "MessageParticipant",
            },
            {
              id: "1234-120b5bdb-cb48-4e2f-a355-842b12866590",
              type: "DisconnectParticipant",
            },
          ],
        ],
        [ContactChannelTypes.CHAT]: [
          [
            {
              id: "1234-test",
              type: "MessageParticipant",
            },
            {
              id: "1234-120b5bdb-cb48-4e2f-a355-842b12866590",
              type: "DisconnectParticipant",
            },
          ],
          [
            {
              id: "1234-test",
              type: "MessageParticipant",
            },
            {
              id: "1234-120b5bdb-cb48-4e2f-a355-842b12866590",
              type: "DisconnectParticipant",
            },
          ],
        ],
        [ContactChannelTypes.EMAIL]: [
          [
            {
              id: "1234-test",
              type: "MessageParticipant",
            },
            {
              id: "1234-120b5bdb-cb48-4e2f-a355-842b12866590",
              type: "DisconnectParticipant",
            },
          ],
        ],
        [ContactChannelTypes.TASK]: [
          [
            {
              id: "1234-test",
              type: "MessageParticipant",
            },
            {
              id: "1234-120b5bdb-cb48-4e2f-a355-842b12866590",
              type: "DisconnectParticipant",
            },
          ],
          [
            {
              id: "1234-test",
              type: "MessageParticipant",
            },
            {
              id: "1234-120b5bdb-cb48-4e2f-a355-842b12866590",
              type: "DisconnectParticipant",
            },
          ],
        ],
      });
    });
  });
});
