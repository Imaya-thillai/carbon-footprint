import 'server-only';
import { NextResponse } from 'next/server';
import Groq from "groq-sdk";
import { z } from 'zod';
import { env } from '@/lib/env';

const rateLimit = new Map<string, { count: number; resetTime: number }>();

const MessageSchema = z.object({
  messages: z.array(z.object({
    sender: z.enum(['user', 'ai']),
    text: z.string().max(2000),
  })).max(20).optional(),
});

export async function POST(req: Request) {
  try {
    const ip = req.headers.get('x-forwarded-for') ?? 'anonymous';
    const now = Date.now();
    const windowMs = 60 * 1000;
    const maxRequests = 10;
    const current = rateLimit.get(ip);
    if (current && now < current.resetTime) {
      if (current.count >= maxRequests) {
        return NextResponse.json({ error: 'Too many requests. Try again in a minute.' }, { status: 429, headers: { 'Retry-After': '60' } });
      }
      current.count++;
    } else {
      rateLimit.set(ip, { count: 1, resetTime: now + windowMs });
    }

    const body = await req.json();
    const parsed = MessageSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    const groq = new Groq({
      apiKey: env.GROQ_API_KEY
    });

    const { messages } = parsed.data;

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { 
          role: 'system', 
          content: 'You are EcoTrack AI, an expert sustainability and carbon footprint assistant. Be concise, friendly, and practical. Keep responses under 3 sentences. Focus on actionable advice for reducing emissions.' 
        },
        ...(messages || []).map((m: { sender: string, text: string }) => ({
          role: (m.sender === 'user' ? 'user' : 'assistant') as 'user' | 'assistant',
          content: m.text
        }))
      ],
      model: "llama-3.1-8b-instant",
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
