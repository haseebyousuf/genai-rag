import readline from "readline";
import dotenv from "dotenv";
import { indexPDF } from "./services/pdf-indexing";
import { queryCollection } from "./services/query-collection";
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

dotenv.config();
async function main() {
  console.log("\nWelcome to PDF Query System!");
  console.log("1. Index a new PDF");
  console.log("2. Query existing collection");

  const choice = await askQuestion("\nEnter your choice (1 or 2): ");

  if (choice === "1") {
    const pdfPath = await askQuestion("Enter the path to PDF file: ");
    const collectionName = await askQuestion("Enter collection name: ");
    await indexPDF(pdfPath, collectionName);
    rl.close();
  } else if (choice === "2") {
    const collectionName = await askQuestion(
      "Enter collection name to query: "
    );

    while (true) {
      const query = await askQuestion(
        "\nEnter your query (or 'quit' to exit): "
      );
      if (query.toLowerCase() === "quit") {
        break;
      }
      const response = await queryCollection(query, collectionName);
      console.log("\nResponse:");
      console.log(response);
      console.log("\n" + "=".repeat(50));
    }
    rl.close();
  } else {
    console.log("Invalid choice!");
    rl.close();
  }
}

function askQuestion(query: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
}

main().catch(console.error);
