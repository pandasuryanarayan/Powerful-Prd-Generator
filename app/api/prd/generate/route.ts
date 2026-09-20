import { NextRequest, NextResponse } from 'next/server';
import { generatePRDSections, PRDGenerationInput } from '@/lib/prd-generator';

export async function POST(request: NextRequest) {
  try {
    const body: PRDGenerationInput = await request.json();
    const { idea = '' } = body;

    if (!idea.trim()) {
      return NextResponse.json({ error: 'Product description is required' }, { status: 400 });
    }

    const projectName =
      idea.split('\n')[0].replace(/[#*]/g, '').trim().substring(0, 45) || 'Product Specification';

    // High-fidelity structured local template generation
    const output = generatePRDSections(body);

    return NextResponse.json({
      success: true,
      projectName: output.projectName,
      sections: output.sections,
    });
  } catch (error: any) {
    console.error('Error generating PRD:', error);
    return NextResponse.json(
      { error: 'Failed to generate PRD', details: error.message },
      { status: 500 }
    );
  }
}