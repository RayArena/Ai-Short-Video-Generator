import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

if (!apiKey) {
  console.error("Environment variable NEXT_PUBLIC_GEMINI_API_KEY is not set.");
  throw new Error("Gemini API key not configured. Please check your .env.local file.");
}

const genAI = new GoogleGenerativeAI(apiKey);

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export async function generateVideoScript(topic) {
  // Get the generative model
  const model = genAI.getGenerativeModel({ 
    model: "gemini-2.5-flash",
    generationConfig 
  });

  // Create chat session with history
  const chatHistory = [
    {
      role: "user",
      parts: [
        {
          text: `Write a script to generate 30 seconds video on topic: Interesting historical story along with AI image prompt in Realistic format for each scene and give me result in JSON format with imagePrompt and ContentText as field.`,
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: `\`\`\`json
{
  "videoScript": [
    {
      "scene": 1,
      "imagePrompt": "Realistic image of a rugged, forested island coastline in the Pacific Northwest, 1859. Calm water, hints of fog, a simple settler's cabin visible near the shore. Accurate period setting.",
      "ContentText": "Imagine 1859, the border between the United States and British Canada is disputed, particularly over the San Juan Islands."
    },
    {
      "scene": 2,
      "imagePrompt": "Realistic image: A large black pig vigorously rooting in a potato patch on a grassy hillside. In the background, an American settler in worn period clothing stands looking exasperated, holding a rifle. San Juan Island, 1859.",
      "ContentText": "On San Juan Island, an American settler named Lyman Cutlar shot a pig eating his potatoes. The pig belonged to Charles Griffin of the British Hudson's Bay Company."
    },
    {
      "scene": 3,
      "imagePrompt": "Realistic image: A tense scene on a misty island shoreline. British and American military ships are anchored close to shore. Groups of soldiers in distinct US and British 1850s uniforms stand on the beach and decks.",
      "ContentText": "What started with a pig escalated fast. Both nations sent military ships and troops, creating a tense stand-off on the island."
    },
    {
      "scene": 4,
      "imagePrompt": "Realistic image: Hundreds of US and British soldiers face each other across a field. Cannons are positioned. Officers look stern. Accurate period military equipment.",
      "ContentText": "Thousands of soldiers faced off, cannons loaded, the absurdity of war over livestock hanging in the air. Thankfully, commanders realized the madness."
    },
    {
      "scene": 5,
      "imagePrompt": "Realistic image: A peaceful scene with British and American officers shaking hands. Military presence minimal. Sunny day. Represents diplomatic resolution.",
      "ContentText": "The 'Pig War' ended without a single human casualty. The pig was the only fatality. This bizarre incident ultimately helped pave the way for peaceful border resolution."
    }
  ]
}
\`\`\``,
        },
      ],
    },
  ];

  const chat = model.startChat({
    history: chatHistory,
  });

  const userPrompt = `Now, write a script for a 30-second video on the topic: "${topic}". 
Follow the same JSON format with fields:
- imagePrompt: a detailed, realistic AI image prompt for each scene.
- ContentText: brief narration for each scene.

Return only valid JSON, no extra text or formatting.`;

  try {
    const result = await chat.sendMessage(userPrompt);
    const rawText = result.response.text();
    
    console.log("Gemini Raw Response:", rawText);

    // Clean up the response to extract JSON
    let jsonString = rawText.trim();
    
    // Remove markdown code blocks if present
    if (jsonString.startsWith('```json')) {
      jsonString = jsonString.replace(/```json\s*/, '').replace(/\s*```$/, '');
    } else if (jsonString.startsWith('```')) {
      jsonString = jsonString.replace(/```\s*/, '').replace(/\s*```$/, '');
    }

    // Find JSON boundaries
    const jsonStart = jsonString.indexOf("{");
    const jsonEnd = jsonString.lastIndexOf("}");

    if (jsonStart !== -1 && jsonEnd !== -1 && jsonEnd > jsonStart) {
      const extractedJson = jsonString.substring(jsonStart, jsonEnd + 1);

      try {
        const parsed = JSON.parse(extractedJson);

        if (!parsed.videoScript || !Array.isArray(parsed.videoScript)) {
          throw new Error("Invalid structure: 'videoScript' array missing.");
        }

        return parsed;
      } catch (parseError) {
        console.error("JSON parsing error:", parseError);
        console.error("Attempted to parse:", extractedJson);
        throw new Error("Invalid JSON format received from Gemini.");
      }
    } else {
      throw new Error("No valid JSON object found in Gemini response.");
    }
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to generate video script. Please try again.");
  }
}