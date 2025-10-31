import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Booking from '@/lib/models/Booking';
import Experience from '@/lib/models/Experience';

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    
    const body = await request.json();
    
    // Generate a unique reference ID
    const refId = "HUF" + Math.random().toString(36).substring(2, 8).toUpperCase() + "SO";
    
    // Create the booking
    const booking = new Booking({
      ...body,
      refId
    });
    
    await booking.save();
    
    return NextResponse.json({
      success: true,
      refId,
      booking
    });
  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json(
      { error: 'Failed to create booking' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectToDatabase();
    
    const bookings = await Booking.find({});
    
    return NextResponse.json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch bookings' },
      { status: 500 }
    );
  }
}