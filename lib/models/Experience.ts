import mongoose, { Schema, Document } from 'mongoose';

export interface ITimeSlot {
  time: string;
  available: number;
  soldOut?: boolean;
}

export interface IDateSlot {
  date: string;
  available: number;
  times: ITimeSlot[];
}

export interface IExperience extends Document {
  id: string;
  title: string;
  location: string;
  price: number;
  image: string;
  description: string;
  about: string;
  dates: IDateSlot[];
}

const timeSlotSchema = new Schema<ITimeSlot>({
  time: { type: String, required: true },
  available: { type: Number, required: true, default: 0 },
  soldOut: { type: Boolean, default: false }
});

const dateSlotSchema = new Schema<IDateSlot>({
  date: { type: String, required: true },
  available: { type: Number, required: true, default: 0 },
  times: [timeSlotSchema]
});

const experienceSchema = new Schema<IExperience>({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  location: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  about: { type: String, required: true },
  dates: [dateSlotSchema]
}, {
  timestamps: true
});

export default mongoose.models.Experience || mongoose.model<IExperience>('Experience', experienceSchema);