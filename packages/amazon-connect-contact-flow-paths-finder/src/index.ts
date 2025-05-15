import { InboundContactFlow } from "@/contact-flow/entities/flows/inbound-flow";

const inboundFlow = new InboundContactFlow(
  "123",
  "Inbound Flow",
  "Inbound Flow Description",
  []
);

console.log("inboundFlow.id", inboundFlow.id);
