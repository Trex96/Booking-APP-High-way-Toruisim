import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Experience from '@/lib/models/Experience';

export async function GET() {
  try {
    await connectToDatabase();
    
    const experiences = await Experience.find({});
    
    return NextResponse.json(experiences);
  } catch (error) {
    console.error('Error fetching experiences:', error);
    return NextResponse.json(
      { error: 'Failed to fetch experiences' },
      { status: 500 }
    );
  }
}