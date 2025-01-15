// examples/basic.js
import Text2Emoji from './src/sdk.js';
import dotenv from 'dotenv';

dotenv.config();

async function test() {
    const text2emoji = new Text2Emoji({
        vectorRestUrl: process.env.UPSTASH_VECTOR_REST_URL,
        vectorRestToken: process.env.UPSTASH_VECTOR_REST_TOKEN
    });

    const testCases = [
        "love",
        "happy",
        "sad",
        "angry",
        "celebration",
        "food"
    ];

    console.log(await text2emoji.get("delicious", 10));

    for (const text of testCases) {
        const emojis = await text2emoji.get(text, 3);
        console.log(`Emojis for "${text}":`, emojis);
    }
}

test().catch(console.error);