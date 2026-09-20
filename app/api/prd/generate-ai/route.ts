import { NextRequest, NextResponse } from 'next/server';
import { generatePRDWithNara, AIInterviewData } from '@/lib/nara-client';

export const dynamic = 'force-dynamic';
export const maxDuration = 25;

export async function POST(request: NextRequest) {
  try {
    const data: AIInterviewData = await request.json();

    if (!data.appName && !data.oneLinePitch) {
      return NextResponse.json(
        { error: 'App name or one-line pitch is required' },
        { status: 400 }
      );
    }

    const output = await generatePRDWithNara(data);
    return NextResponse.json(output, { status: 200 });
  } catch (error: any) {
    console.error('[API generate-ai error]:', error);
    return NextResponse.json(
      { error: 'Internal server error during AI generation', details: error.message },
      { status: 500 }
    );
  }
}
