import mongoose, { Schema, Document } from "mongoose";

export interface IRSVP extends Document {
  weddingSlug: string;
  guestName: string;
  guestCount: number;
  mealPreference: "veg" | "non-veg" | null;
  message: string;
  submittedAt: Date;
}

const RSVPSchema = new Schema<IRSVP>({
  weddingSlug: { type: String, required: true, index: true },
  guestName: { type: String, required: true, minlength: 2, maxlength: 50 },
  guestCount: { type: Number, required: true, min: 1, max: 4 },
  mealPreference: {
    type: String,
    enum: ["veg", "non-veg", null],
    default: null,
  },
  message: { type: String, maxlength: 300, default: "" },
  submittedAt: { type: Date, default: Date.now },
});

export const RSVP =
  mongoose.models.RSVP || mongoose.model<IRSVP>("RSVP", RSVPSchema);
