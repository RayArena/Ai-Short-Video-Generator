import { createClient } from "@deepgram/sdk";
import { NextResponse } from "next/server";
import fs from 'fs';
import path from 'path';

const deepgram = createClient(process.env.NEXT_PUBLIC_DEEPGRAM_API_KEY);

export async function POST(req) {
    try {
        const { text, id } = await req.json();

        if (!text) {
            return NextResponse.json({ error: 'Text is required' }, { status: 400 });
        }

        const response = await deepgram.speak.request(
            { text },
            {
                model: "aura-2-janus-en",
                encoding: "linear16",
                container: "wav",
            }
        );

        const stream = await response.getStream();
        
        if (stream) {
            // Convert the stream to an audio buffer
            const buffer = await getAudioBuffer(stream);
            
            // Define output path (you might want to use a public directory)
            const outputPath = path.join(process.cwd(), 'public', 'audio', `${id || 'output'}.mp3`);
            
            // Ensure the directory exists
            const dir = path.dirname(outputPath);
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
            
            // Write the audio buffer to a file
            fs.writeFileSync(outputPath, buffer);
            
            console.log(`Audio file written to ${outputPath}`);
            
            return NextResponse.json({ 
                result: 'Success', 
                audioPath: `/audio/${id || 'output'}.mp3`,
                message: 'Audio generated successfully' 
            });
            
        } else {
            console.error("Error generating audio: No stream received");
            return NextResponse.json({ error: 'Failed to generate audio stream' }, { status: 500 });
        }

    } catch (error) {
        console.error("Error in TTS route:", error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

// Helper function to convert stream to buffer
async function getAudioBuffer(response) {
    const reader = response.getReader();
    const chunks = [];

    while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        chunks.push(value);
    }

    const dataArray = chunks.reduce((acc, chunk) => {
        const newArray = new Uint8Array(acc.length + chunk.length);
        newArray.set(acc);
        newArray.set(chunk, acc.length);
        return newArray;
    }, new Uint8Array(0));

    return Buffer.from(dataArray.buffer);
}