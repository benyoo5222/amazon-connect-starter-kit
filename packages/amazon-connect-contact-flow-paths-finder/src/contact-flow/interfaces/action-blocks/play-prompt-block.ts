import { IContactFlowActionBlock } from "./contact-flow-action-block";

export interface IPlayPromptBlock extends IContactFlowActionBlock {
  parameters: {
    PromptId?: string; // Id or ARN of the prompt to play
    Text?: string; // Text to play (Text to speech)
    SSML?: string; // SSML to play
    Media?: {
      // An optional object that defines an external media source
      Uri: string; // Location of the message
      SourceType: "S3"; // The source from which the message will be fetched. The only supported type is S3
      MediaType: "Audio"; // The type of the message to be played. The only supported type is Audio
    };
  };
  transitions: {
    NextAction: string; // The next action to be executed
    Errors: [
      {
        NextAction: string;
        ErrorType: "NoMatchingError";
      },
    ];
  };
}
