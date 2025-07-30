import { generateText, streamText } from "ai";
import { cohere } from '@ai-sdk/cohere';
import { tools } from "./tools/tools";
import { PROMPT_TEMPLATES } from "./ai-config";

export type Message = {
  role: "user" | "assistant" | "system";
  content: string;
};

export async function answer(messages: Message[]) {
  try {
    const lastMessage = messages[messages.length - 1].content;
    console.log("\n=== Processing New Message ===");
    console.log("User Query:", lastMessage);

    // Format conversation history
    const conversationHistory = messages
      .slice(0, -1)
      .map((msg) => `${msg.role}: ${msg.content}`)
      .join("\n");

    // Create enhanced system prompt for lead conversion
    const systemPrompt = PROMPT_TEMPLATES.SYSTEM_PROMPT.replace(
      "{conversationHistory}",
      conversationHistory
    );

    // Use streamText with enhanced prompting and tool usage
    const result = await streamText({
      model: cohere("command-r-plus"),
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: lastMessage },
      ],
      tools,
      maxSteps: 8, // Increased to allow for knowledge search + response + follow-up
      temperature: 0.1, // Slightly higher for more natural conversation
      toolChoice: "auto", // Let AI decide when to use tools
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error("\n=== Error in RAG answer ===");
    console.error(error);
    throw error;
  }
}
