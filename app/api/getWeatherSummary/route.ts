import openai from '@/openai';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    // weatherdata in the body of the POST req
    const { weatherData } = await request.json();

    const messages: { role: 'system' | 'user'; content: string }[] = [
        { 
          role: 'system',
          content: `Pretend you're a weather news presenter presenting LIVE on television. Be energetic and full of charisma. 
          Present yourself as Daniele, state the city you are providing a short summary for, and give a summary of today's weather only. 
          Make it easy for the viewer to understand and know what to do to prepare for those weather conditions, and you should be funny about it 
          Provide also a joke regarding the weather. Assume the data came from your team at the news office and not the user.
          Remember, the overall sentence should be max 4 sentences`,
        },
        { 
          role: 'user',
          content: `Hi there, can I get a brief summary of today's weather, use the following information to get the weather data: ${JSON.stringify(weatherData)}`,
        }
      ];
  
      // Make the API request
      try {
        const response = await openai.chat.completions.create({
          model: 'gpt-3.5-turbo',
          temperature: 0.8,
          messages: messages
        });

        console.log("DATA IS: ", response);
        return NextResponse.json(response.choices[0].message);
    } catch (error) {
        console.error("Error making request to OpenAI:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

//OPENAI_API_KEY