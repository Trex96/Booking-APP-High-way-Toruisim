import mongoose, { Schema, Document } from 'mongoose';

export interface IBooking extends Document {
  experienceId: string;
  experienceTitle: string;
  date: string;
  time: string;
  quantity: number;
  fullName: string;
  email: string;
  subtotal: number;
  taxes: number;
  total: number;
  promoCode: string | null;
  refId: string;
}

const bookingSchema = new Schema<IBooking>({
  experienceId: { type: String, required: true },
  experienceTitle: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  quantity: { type: Number, required: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  subtotal: { type: Number, required: true },
  taxes: { type: Number, required: true },
  total: { type: Number, required: true },
  promoCode: { type: String, default: null },
  refId: { type: String, required: true, unique: true }
}, {
  timestamps: true
});

export default mongoose.models.Booking || mongoose.model<IBooking>('Booking', bookingSchema);