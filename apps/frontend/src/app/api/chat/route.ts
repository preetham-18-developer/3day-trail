import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Invalid messages format' }, { status: 400 });
    }

    const systemPrompt = {
      role: 'system',
      content: `You are an AI Student Ambassador for "CollegeHunt", India's top college admission platform. 
      Rules:
      1. Keep answers extremely short and to the point (max 2-3 sentences) to save tokens.
      2. If asked about the "best college" for a field, give actual real-world answers for India. Example: for CSE, recommend IIT Bombay, IIT Delhi, IIIT Hyderabad, or NIT Trichy. For Medical, recommend AIIMS Delhi, CMC Vellore. For MBA, recommend IIM Ahmedabad, IIM Bangalore.
      3. If the user asks about ANYTHING irrelevant to college, admission, courses, or campus life, you MUST refuse to answer and politely steer them back to college topics.
      4. Speak in a friendly, helpful, and energetic conversational tone.`
    };

    const apiMessages = [systemPrompt, ...messages];

    // Using Nvidia NIM API because of 'nvapi-' key prefix.
    const response = await fetch('https://integrate.api.nvidia.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.AI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'meta/llama-3.1-8b-instruct',
        messages: apiMessages,
        max_tokens: 150,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error:', errorText);
      return NextResponse.json({ error: 'Failed to generate response' }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json({ 
      reply: data.choices[0].message.content 
    });

  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
