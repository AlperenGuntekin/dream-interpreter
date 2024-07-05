import { NextResponse } from 'next/server';
import { interpretDream } from '../../utils/ai';

export async function POST(request: Request) {
  try {
    const { dream } = await request.json();
    if (!dream) {
      return NextResponse.json(
        { error: 'Dream content is required' },
        { status: 400 }
      );
    }
    const interpretation = await interpretDream(dream);
    return NextResponse.json({ interpretation });
  } catch (error: any) {
    console.error('Error in interpret API:', error.message, error.stack);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
