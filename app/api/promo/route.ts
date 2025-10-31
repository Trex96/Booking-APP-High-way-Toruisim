import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import PromoCode from '@/lib/models/PromoCode';

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    
    const body = await request.json();
    const { code } = body;
    
    if (!code) {
      return NextResponse.json(
        { error: 'Promo code is required' },
        { status: 400 }
      );
    }
    
    const promoCode = await PromoCode.findOne({ 
      code: code.toUpperCase(),
      isActive: true
    });
    
    if (!promoCode) {
      return NextResponse.json(
        { error: 'Invalid promo code' },
        { status: 404 }
      );
    }
    
    // Check if promo code has expired
    if (promoCode.expirationDate && new Date(promoCode.expirationDate) < new Date()) {
      return NextResponse.json(
        { error: 'Promo code has expired' },
        { status: 400 }
      );
    }
    
    // Check if promo code has reached max uses
    if (promoCode.maxUses && promoCode.usedCount >= promoCode.maxUses) {
      return NextResponse.json(
        { error: 'Promo code has reached its maximum uses' },
        { status: 400 }
      );
    }
    
    return NextResponse.json({
      success: true,
      discountType: promoCode.discountType,
      discountValue: promoCode.discountValue
    });
  } catch (error) {
    console.error('Error validating promo code:', error);
    return NextResponse.json(
      { error: 'Failed to validate promo code' },
      { status: 500 }
    );
  }
}