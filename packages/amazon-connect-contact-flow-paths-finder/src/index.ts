import { InboundContactFlow } from "@/contact-flow/entities/flows/inbound-flow";

const inboundFlow = new InboundContactFlow({
  id: "123",
  name: "Inbound Flow",
  description: "Inbound Flow Description",
  actionBlocks: [],
  rawContactFlow: "{}",
});

console.log("inboundFlow.id", inboundFlow.id);
