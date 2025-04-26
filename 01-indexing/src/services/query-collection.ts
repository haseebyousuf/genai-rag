import { OpenAIEmbeddings } from "@langchain/openai";

import OpenAI from "openai";
import { QdrantVectorStore } from "@langchain/qdrant";

export async function queryCollection(
  userQuery: string,
  collectionName: string
) {
  try {
    console.log("Thinking...");
    const embedder = new OpenAIEmbeddings({
      apiKey: process.env.OPENAI_API_KEY,
      model: "text-embedding-3-large",
    });
    const vectorStore = await QdrantVectorStore.fromExistingCollection(
      embedder,
      {
        url: process.env.QDRANT_URL,
        collectionName: collectionName,
      }
    );

    const relevantDocs = await vectorStore.similaritySearch(userQuery);
    console.log(relevantDocs);
    const context = relevantDocs.map((doc) => doc.pageContent).join("\n");
    1;
    console.log({ context });

    const SYSTEM_PROMPT = `
           You are a helpful AI Assistant who responds to user queries based on the available context.
            Context:
            ${context}
          `;
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY!,
    });
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userQuery },
      ],
    });
    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error querying collection:", error);
    throw error;
  }
}
