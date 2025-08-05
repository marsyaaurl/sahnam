import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt tidak boleh kosong." },
        { status: 400 }
      );
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const output = await response.text();

    return NextResponse.json({ output });
  } catch (error) {
    if (error instanceof Error) {
        console.error("Gemini API error:", error.message); 
    } else {
        console.error("An unknown error occurred:", error);
    }
    return NextResponse.json(
      { error: "Gagal membuat cerita. Silakan coba lagi." },
      { status: 500 }
    );
  }
}