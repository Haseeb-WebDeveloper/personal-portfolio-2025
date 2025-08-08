import { tool } from 'ai';
import { z } from 'zod';
import { SupabaseVectorStore } from '@langchain/community/vectorstores/supabase';
import { OllamaEmbeddings } from '@langchain/ollama';
import { supabaseClient } from '@/lib/supabase';
import { OpenAIEmbeddings } from '@langchain/openai';

/* ---------- Vector store setup ------------------------------------ */
const embeddings = new OpenAIEmbeddings({
    model: 'text-embedding-3-small',                     
    apiKey: process.env.OPENAI_API_KEY,
});

const vectorStore = new SupabaseVectorStore(embeddings, {
    client: supabaseClient,
    tableName: 'documents',
    queryName: 'match_documents',
});

// Enhanced search query processing
function enhanceSearchQuery(query: string): string {
    const queryLower = query.toLowerCase();
    
    // Map user queries to more specific search terms
    const queryMappings: { [key: string]: string } = {
        'projects': 'websites built projects portfolio Figmenta Enzig Assess GPT Rateourjob',
        'websites': 'websites built projects portfolio Figmenta Enzig Assess GPT Rateourjob',
        'portfolio': 'websites built projects portfolio Figmenta Enzig Assess GPT Rateourjob',
        'work': 'websites built projects portfolio Figmenta Enzig Assess GPT Rateourjob',
        'built': 'websites built projects portfolio Figmenta Enzig Assess GPT Rateourjob',
        'created': 'websites built projects portfolio Figmenta Enzig Assess GPT Rateourjob',
        'developed': 'websites built projects portfolio Figmenta Enzig Assess GPT Rateourjob',
        'pricing': 'pricing plans cost budget Basic Standard Premium Enterprise',
        'cost': 'pricing plans cost budget Basic Standard Premium Enterprise',
        'budget': 'pricing plans cost budget Basic Standard Premium Enterprise',
        'price': 'pricing plans cost budget Basic Standard Premium Enterprise',
        'contact': 'email phone whatsapp linkedin web.dev.haseeb@gmail.com',
        'email': 'email phone whatsapp linkedin web.dev.haseeb@gmail.com',
        'phone': 'email phone whatsapp linkedin web.dev.haseeb@gmail.com',
        'whatsapp': 'email phone whatsapp linkedin web.dev.haseeb@gmail.com',
        'skills': 'technical expertise programming languages frameworks Next.js React TypeScript',
        'technologies': 'technical expertise programming languages frameworks Next.js React TypeScript',
        'tech stack': 'technical expertise programming languages frameworks Next.js React TypeScript',
        'experience': 'background journey career Figmenta agency',
        'background': 'background journey career Figmenta agency',
        'journey': 'background journey career Figmenta agency',
        'services': 'services offered web development saas ai chatbot',
        'ai': 'ai solutions chatbot rag Assess GPT Rateourjob',
        'chatbot': 'ai solutions chatbot rag Assess GPT Rateourjob',
    };

    // Check if any mapping applies
    for (const [key, enhancedQuery] of Object.entries(queryMappings)) {
        if (queryLower.includes(key)) {
            return enhancedQuery;
        }
    }

    return query;
}

export const databaseTool = tool({
    description: `Tool for searching specific information about Haseeb (like his contact info, skills, experience, projects, pricing, his life journey, etc.) in the knowledge base. If user ask anyting that you don't know then use this tool`,
    parameters: z.object({
        query: z.string().describe('The specific information about Haseeb you need to find. Make your query clear and focused.'),
    }),
    async execute({ query }) {
        try {
            console.log("\n=== Database Tool Execution ===");
            console.log("Original query:", query);
            
            // Enhance the search query
            const enhancedQuery = enhanceSearchQuery(query);
            console.log("Enhanced query:", enhancedQuery);

            // First verify documents exist
            const { data: docCount, error: countError } = await supabaseClient
                .from('documents')
                .select('count');

            if (countError) {
                console.error("Error checking documents:", countError);
                return "I encountered an error while trying to access Haseeb's information.";
            }

            console.log("Number of documents available:", docCount);

            // Try similarity search with enhanced query
            const similarDocs = await vectorStore.similaritySearchWithScore(enhancedQuery, 8);
            console.log("Number of similar documents found for query:", similarDocs.length, enhancedQuery);
            
            if (similarDocs.length > 0) {
                // Find the highest score
                const maxScore = Math.max(...similarDocs.map(([_, score]) => score));
                const scoreThreshold = maxScore - 0.2; // Increased threshold for better coverage
                
                console.log("Max similarity score:", maxScore);
                console.log("Score threshold:", scoreThreshold);

                // Filter and format results with better scoring
                const results = similarDocs
                    .filter(([_, score]) => score >= scoreThreshold)
                    .map(([doc, score]) => ({
                        content: doc.pageContent,
                        category: doc.metadata.category || 'general',
                        score: score
                    }))
                    .sort((a, b) => b.score - a.score); // Sort by score descending

                console.log("Number of relevant results:", results.length);

                if (results.length === 0) {
                    return "I searched but couldn't find any relevant information about that in Haseeb's knowledge base.";
                }

                // For projects, try to get more comprehensive results
                const queryLower = query.toLowerCase();
                const isProjectQuery = queryLower.includes('project') || queryLower.includes('website') || queryLower.includes('built') || queryLower.includes('created') || queryLower.includes('portfolio');
                const maxResults = isProjectQuery ? 5 : 3;
                
                // Take more results for project queries
                const topResults = results.slice(0, maxResults);
                
                // For project queries, ensure we have actual project content, not just headers
                if (isProjectQuery && topResults.length > 0) {
                    const hasProjectContent = topResults.some(result => 
                        result.content.toLowerCase().includes('figmenta') || 
                        result.content.toLowerCase().includes('assess gpt') ||
                        result.content.toLowerCase().includes('rateourjob') ||
                        result.content.toLowerCase().includes('enzig') ||
                        result.content.toLowerCase().includes('tech stack')
                    );
                    
                    if (!hasProjectContent) {
                        console.log("No actual project content found, trying broader search...");
                        // Try a broader search for project content
                        const broaderResults = await vectorStore.similaritySearchWithScore("Figmenta Assess GPT Rateourjob Enzig websites", 5);
                        const projectResults = broaderResults
                            .filter(([doc, score]) => doc.metadata.category === 'projects')
                            .map(([doc, score]) => ({
                                content: doc.pageContent,
                                category: doc.metadata.category || 'projects',
                                score: score
                            }))
                            .slice(0, 3);
                        
                        if (projectResults.length > 0) {
                            const formattedResults = projectResults
                                .map(r => `[${r.category}] ${r.content}`)
                                .join('\n\n');
                            console.log("Found project information with broader search:", formattedResults);
                            return formattedResults;
                        }
                    }
                }
                
                const formattedResults = topResults
                    .map(r => `[${r.category}] ${r.content}`)
                    .join('\n\n');

                console.log("Found relevant information:", formattedResults);
                return formattedResults;
            }

            // Fallback to retriever if no good results
            console.log("Falling back to retriever search...");
            const retriever = vectorStore.asRetriever({
                k: 3,
                searchType: "similarity",
            });

            const docs = await retriever.getRelevantDocuments(enhancedQuery);
            console.log("Number of documents from retriever:", docs.length);
            
            if (docs.length === 0) {
                return "I couldn't find any information about that in Haseeb's knowledge base.";
            }

            const formattedDocs = docs
                .map(doc => `[${doc.metadata.category || 'general'}] ${doc.pageContent}`)
                .join('\n\n');

            console.log("Found information from retriever:", formattedDocs);
            return formattedDocs;

        } catch (error) {
            console.error("\n=== Error in Database Tool ===");
            console.error(error);
            return "I encountered an error while searching Haseeb's knowledge base: " + 
                   (error instanceof Error ? error.message : String(error));
        }
    }
});
