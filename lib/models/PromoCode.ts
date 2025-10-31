import mongoose, { Schema, Document } from 'mongoose';

export interface IPromoCode extends Document {
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  maxUses: number | null;
  usedCount: number;
  expirationDate: Date | null;
  isActive: boolean;
}

const promoCodeSchema = new Schema<IPromoCode>({
  code: { type: String, required: true, unique: true },
  discountType: { type: String, enum: ['percentage', 'fixed'], required: true },
  discountValue: { type: Number, required: true },
  maxUses: { type: Number, default: null }, // null means unlimited uses
  usedCount: { type: Number, default: 0 },
  expirationDate: { type: Date, default: null }, // null means no expiration
  isActive: { type: Boolean, default: true }
}, {
  timestamps: true
});

export default mongoose.models.PromoCode || mongoose.model<IPromoCode>('PromoCode', promoCodeSchema);