import { NextResponse } from 'next/server';
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { 
          role: 'system', 
          content: 'You are EcoTrack AI, an expert sustainability and carbon footprint assistant. Be concise, friendly, and practical. Keep responses under 3 sentences. Focus on actionable advice for reducing emissions.' 
        },
        ...messages.map((m: { sender: string, text: string }) => ({
          role: m.sender === 'user' ? 'user' : 'assistant',
          content: m.text
        }))
      ],
      model: "llama3-8b-8192",
      max_tokens: 250,
      temperature: 0.7,
    });

    const reply = chatCompletion.choices[0]?.message?.content || "I'm sorry, I couldn't process that.";
    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Groq API Error:", error);
    return NextResponse.json({ error: "Failed to fetch response" }, { status: 500 });
  }
}
