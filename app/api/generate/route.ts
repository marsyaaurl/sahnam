import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json();

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' }, 
        { status: 400 }
      );
    }

    // Simulasi hasil dari prompt user
    const mockAIResponse = {
      output: `✨ AI Analysis Result ✨\n\nPrompt received:\n\n${prompt}`
    };

    return NextResponse.json(mockAIResponse, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });

  } catch (error) {
    console.error('Error generating AI insights:', error);
    return NextResponse.json(
      { error: 'Failed to generate AI insights' }, 
      { status: 500 }
    );
  }
}
