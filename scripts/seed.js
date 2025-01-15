import {Index} from "@upstash/vector";
import dotenv from 'dotenv';
import {readFile} from 'fs/promises';


dotenv.config();

const index = new Index({
    url: process.env.UPSTASH_VECTOR_REST_URL,
    token: process.env.UPSTASH_VECTOR_REST_TOKEN
});

const EMOJI_FILE_PATH = './scripts/emoji_data.json'; // Local file path

/**
 * Function to load emojis, generate descriptions using LLM, and upsert each entry to an Upstash vector index
 */
async function loadAndInsertEmbeddings() {
    try {
        const rawData = await readFile(EMOJI_FILE_PATH, 'utf-8');
        const data = JSON.parse(rawData); // JSON array of emojis
        // Group emojis into batches
        const batches = [];
        const batchSize = 10;
        console.log(`Processing ${data.length} emojis...`);
        for (let i = 0; i < data.length; i += batchSize) {
            batches.push(data.slice(i, i + batchSize));
        }

        let count = 0;
        for (const batch of batches) {
            try {
                const upsertData = [];
                for (const entry of batch) {
                    upsertData.push({
                        id: entry.id,
                        data: entry.data,
                        metadata: entry.metadata,
                    });
                }                             
                await index.upsert(upsertData);
                count += batch.length;
                console.log(`${count} of ${data.length} emojis are stored in the vector index.`);
            } catch (error) {
                console.error(`Failed to process batch. Error: ${error.message}`);
            }
        }
        console.log('All emoji embeddings inserted successfully.');
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

// Call the function to execute the data embedding process
loadAndInsertEmbeddings();