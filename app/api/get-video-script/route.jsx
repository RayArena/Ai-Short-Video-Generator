// app/api/get-video-script/route.jsx

import { NextResponse } from 'next/server';
import { generateVideoScript } from '../../../configs/AiModel'; // Import the EXPORTED FUNCTION

export async function POST(req) {
    try {
        const { prompt } = await req.json(); // Get the topic/prompt from the client's request body
        // console.log("Received prompt from client:", prompt);

        // Call the exported function, passing the client's prompt
        const videoScript = await generateVideoScript(prompt);

        // console.log("Generated Video Script:", videoScript);

        return NextResponse.json(videoScript, { status: 200 });
    } catch (error) {
        console.error('API Route Error:', error);
        return NextResponse.json({ error: error.message || 'Failed to generate video script.' }, { status: 500 });
    }
}