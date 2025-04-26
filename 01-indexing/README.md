# PDF Query  with LangChain and Qdrant

This project implements a RAG (Retrieval Augmented Generation) that allows users to:

1. Index PDF documents into a Qdrant vector database
2. Query the indexed documents using natural language

## Prerequisites

- Node.js
- Docker and Docker Compose
- OpenAI API key
- TypeScript

## Setup Instructions

1. **Clone the repository and install dependencies**

```bash
git clone https://github.com/haseebyousuf/genai-rag.git
cd 01-indexing
pnpm install
```

2. **Set up environment variables**
Create a `.env` file in the project root with the following:

```env
OPENAI_API_KEY=your_openai_api_key_here
QDRANT_URL=http://localhost:6333
```

3. **Start Qdrant database**

```bash
docker-compose up -d
```

This will start Qdrant on port 6333.

4. **Run the application**

```bash
pnpm dev
```

## Usage Guide

### 1. Indexing a PDF

When prompted, select option `1` to index a new PDF:

- For the PDF path, provide the full path to your PDF file
  - Example: `/Users/username/documents/sample.pdf`
  - You can also place PDFs in the `src` folder and reference them relatively
    - Example: `src/sample.pdf`
- Enter a collection name for the PDF (this will be used when querying)
  - Example: `my_document`

### 2. Querying the Collection

Select option `2` to query an existing collection:

- Enter the collection name you used during indexing
- Type your questions in natural language
- Type 'quit' to exit the query mode
