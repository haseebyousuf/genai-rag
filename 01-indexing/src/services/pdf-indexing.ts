import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { OpenAIEmbeddings } from "@langchain/openai";
import { QdrantVectorStore } from "@langchain/qdrant";

export async function indexPDF(pdfPath: string, collectionName: string) {
  try {
    console.log(`Indexing PDF to collection: ${collectionName}`);

    const loader = new PDFLoader(pdfPath);
    const docs = await loader.load();
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 600,
      chunkOverlap: 80,
    });
    const splitDocs = await textSplitter.splitDocuments(docs);
    const embedder = new OpenAIEmbeddings({
      apiKey: process.env.OPENAI_API_KEY,
      model: "text-embedding-3-large",
    });
    const vectorStore = await QdrantVectorStore.fromDocuments(
      splitDocs,
      embedder,
      {
        url: process.env.QDRANT_URL,
        collectionName: collectionName,
      }
    );
    console.log(`Successfully indexed PDF to collection: ${collectionName}`);
  } catch (error) {
    console.error("Error indexing PDF:", error);
    throw error;
  }
}
