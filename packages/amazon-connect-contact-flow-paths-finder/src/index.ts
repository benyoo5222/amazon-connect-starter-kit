import { ContactFlowMapper } from "@/contact-flow/mappers/flow/contact-flow-mapper";
import { v4 as uuidv4 } from "uuid";
import { ContactChannelTypes } from "./contact-flow/enums/contact/contact-channel-types";

function parseContactFlow(rawContactFlow: string) {
  // Map the raw contact flow to an application contact flow entity
  const contactFlowMapper = new ContactFlowMapper();
  const contactFlow = contactFlowMapper.toContactFlow({
    rawContactFlow,
    id: uuidv4(),
  });

  const areActionBlocksSupported = contactFlow.areActionBlocksSupported();
  const isContactChannelTypeSupported =
    contactFlow.isContactChannelTypeSupported(ContactChannelTypes.VOICE);

  console.log("areActionBlocksSupported", areActionBlocksSupported);
  console.log("isContactChannelTypeSupported", isContactChannelTypeSupported);
}

parseContactFlow(
  JSON.stringify({
    Version: "2019-10-30",
    StartAction: "00230d37-bbcc-49e0-85e3-9c0a29e16c90",
    Metadata: {
      entryPointPosition: {
        x: 40,
        y: 40,
      },
      ActionMetadata: {
        "00230d37-bbcc-49e0-85e3-9c0a29e16c90": {
          position: {
            x: 212,
            y: 40,
          },
        },
      },
      Annotations: [],
      name: "test2",
      description: "",
      type: "contactFlow",
      status: "PUBLISHED",
      hash: {},
    },
    Actions: [
      {
        Parameters: {
          Text: "Hello",
        },
        Identifier: "00230d37-bbcc-49e0-85e3-9c0a29e16c90",
        Type: "MessageParticipant",
        Transitions: {
          NextAction: "",
          Errors: [
            {
              NextAction: "",
              ErrorType: "NoMatchingError",
            },
          ],
        },
      },
    ],
  })
);
