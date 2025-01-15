// src/sdk.js
import { Index } from "@upstash/vector";

class Text2Emoji {
    constructor({ vectorRestUrl = process.env.UPSTASH_VECTOR_REST_URL, vectorRestToken = process.env.UPSTASH_VECTOR_REST_TOKEN } = {}) {
        if (!vectorRestToken) {
            throw new Error('vectorRestToken is required. Set it via the constructor or the UPSTASH_VECTOR_REST_TOKEN environment variable.');
        }
        if (!vectorRestUrl) {
            throw new Error('vectorRestUrl is required. Set it via the constructor or the UPSTASH_VECTOR_REST_URL environment variable.');
        }

        this.index = new Index({
            url: vectorRestUrl,
            token: vectorRestToken
        });

    }

    async get(text, topK = 1) {
        if (!text || typeof text !== 'string') {
            throw new Error('Text must be a non-empty string');
        }

        if (!Number.isInteger(topK) || topK < 1) {
            throw new Error('topK must be a positive integer');
        }

        try {

            const results = await this.index.query({
                data: text,
                topK,
                includeMetadata: true
            });

            // Return single emoji if topK is 1
            if (topK === 1) {
                return results[0].metadata.emoji;
            }

            // Return array of emojis for topK > 1
            return results.map(result => result.metadata.emoji);
        } catch (error) {
            throw new Error(`Failed to get emoji: ${error.message}`);
        }
    }
}

export default Text2Emoji;