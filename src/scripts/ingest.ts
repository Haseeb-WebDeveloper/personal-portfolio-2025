import fs from "node:fs/promises";
import path from "node:path";
import { MarkdownTextSplitter } from "@langchain/textsplitters";
import { OpenAIEmbeddings } from "@langchain/openai";
// import { OllamaEmbeddings } from "@langchain/ollama";
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { supabaseClient } from "@/lib/supabase";

async function main() {
  try {
    // First clear existing documents
    await supabaseClient.from('documents').delete().neq('id', 0);  //default all rows where id is not 0

    // 1‑A. Read .md files
    const dataDir = "src/knowledge";    
    const files = await fs.readdir(dataDir);  //read all files in the dataDir
    const mdFiles = files.filter(f => f.endsWith(".md"));

    console.log(`Found ${mdFiles.length} markdown files in ${dataDir}`);

    // Process each file and add metadata
    const docs = [];
    for (const file of mdFiles) {
      const content = await fs.readFile(path.join(dataDir, file), "utf8");  //read the file
      
      // 1-B. Extract metadata from filename with better category mapping
      const fileName = path.basename(file, ".md");
      let category = fileName;
      
      // Map file names to more descriptive categories
      const categoryMappings: { [key: string]: string } = {
        'projects': 'projects',
        'pricing': 'pricing',
        'contact': 'contact',
        'services': 'services',
        'background': 'background',
        'work-style': 'work-style',
        'philosophy': 'philosophy',
        'personal-info': 'personal-info',
        'technical-expertise': 'technical-expertise',
        'professional-summary': 'professional-summary'
      };
      
      category = categoryMappings[fileName] || fileName;

      console.log(`Processing file: ${file} with category: ${category}`);
      
      const splitter = new MarkdownTextSplitter ({
        chunkSize: 2000, // Increased chunk size to preserve complete project information
        chunkOverlap: 200, // Increased overlap to maintain context
      });

      // 1-C. Chunk with enhanced metadata
      const fileChunks = await splitter.createDocuments(
        [content],
        [{ 
          source: file,
          category,
          chunk_type: "markdown",
          created_at: new Date().toISOString(),
          file_name: fileName
        }]
      );

      console.log(`Processed ${fileChunks.length} chunks from ${file}`);

      docs.push(...fileChunks);
    }

    if (docs.length === 0) {
      console.log("⚠️ No documents found to ingest. Please add .md files to", dataDir);
      return;
    }

    // 1‑D. Embed + store in Supabase
    const embeddings = new OpenAIEmbeddings({
        model: "text-embedding-3-small",
        apiKey: process.env.OPENAI_API_KEY,
    });

    console.log(`Embedding ${docs.length} documents...`);

   

    // Store the documents
    const store = await SupabaseVectorStore.fromDocuments(
      docs,
      embeddings,
      {
        client: supabaseClient,
        tableName: 'documents',
        queryName: 'match_documents'
      }
    );

    console.log(`Stored ${store} documents in Supabase`);

    // Test the search with different queries
    const testQueries = [
      "projects websites built",
      "pricing plans cost",
      "contact information email"
    ];
    
    for (const testQuery of testQueries) {
      const results = await store.similaritySearchWithScore(testQuery, 2);
      console.log(`Test query "${testQuery}" returned ${results.length} results`);
      if (results.length > 0) {
        console.log(`Top result category: ${results[0][0].metadata.category}`);
      }
    }
  } catch (error) {
    console.error("\nError during ingestion:", error);
    process.exit(1);
  }
}

main();
