import { ContactFlowMapper } from "@/contact-flow/mappers/flow/contact-flow-mapper";
import { v4 as uuidv4 } from "uuid";
import { ContactFlowPathsFinder } from "./entities/contact-flow-paths-finder";
function parseContactFlow(rawContactFlow: string) {
  // Map the raw contact flow to an application contact flow entity
  const contactFlowMapper = new ContactFlowMapper();
  const contactFlow = contactFlowMapper.toContactFlow({
    rawContactFlow,
    id: uuidv4(),
  });

  const contactFlowPathsFinder = new ContactFlowPathsFinder(
    [contactFlow],
    contactFlow.id
  );

  const paths = contactFlowPathsFinder.findPaths();

  for (const [contactChannelType, allPaths] of Object.entries(paths)) {
    console.log(contactChannelType);
    for (const path of allPaths) {
      console.log(path);
    }
  }

  return paths;
}

parseContactFlow(
  JSON.stringify({
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
  })
);
