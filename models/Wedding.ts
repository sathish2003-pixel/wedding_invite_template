import mongoose, { Schema, Document } from "mongoose";

export interface IWedding extends Document {
  slug: string;
  plan: "free" | "premium" | "premium_plus";
  couple: {
    brideName: string;
    groomName: string;
    brideFamily: string;
    groomFamily: string;
    loveStory: string;
    couplePhoto: string;
    hashtag: string;
    customMessage: string;
    language: string;
  };
  events: {
    name: string;
    date: Date;
    time: string;
    venueName: string;
    venueAddress: string;
    mapsLink: string;
    dressCode: string;
  }[];
  gallery: string[];
  design: {
    template: number;
    colorTheme: string;
    musicTrack: string | null;
    musicEnabled: boolean;
  };
  rsvp: {
    enabled: boolean;
    deadline: Date | null;
    contactPhone: string;
  };
  meta: {
    createdAt: Date;
    expiresAt: Date | null;
    views: number;
    coupleEmail: string;
    isPublished: boolean;
  };
}

const WeddingSchema = new Schema<IWedding>({
  slug: { type: String, unique: true, required: true, index: true },
  plan: {
    type: String,
    enum: ["free", "premium", "premium_plus"],
    default: "free",
  },
  couple: {
    brideName: { type: String, required: true },
    groomName: { type: String, required: true },
    brideFamily: { type: String, default: "" },
    groomFamily: { type: String, default: "" },
    loveStory: { type: String, maxlength: 1000, default: "" },
    couplePhoto: { type: String, default: "" },
    hashtag: { type: String, default: "" },
    customMessage: { type: String, maxlength: 300, default: "" },
    language: {
      type: String,
      enum: ["en", "hi", "ta", "te", "kn", "ml"],
      default: "en",
    },
  },
  events: [
    {
      name: { type: String, required: true },
      date: { type: Date, required: true },
      time: { type: String, required: true },
      venueName: { type: String, required: true },
      venueAddress: { type: String, required: true },
      mapsLink: { type: String, default: "" },
      dressCode: { type: String, default: "" },
    },
  ],
  gallery: { type: [String], default: [] },
  design: {
    template: { type: Number, min: 1, max: 6, default: 1 },
    colorTheme: {
      type: String,
      enum: [
        "rose-gold",
        "royal-blue",
        "emerald",
        "midnight",
        "blush",
        "saffron",
      ],
      default: "rose-gold",
    },
    musicTrack: { type: String, default: null },
    musicEnabled: { type: Boolean, default: false },
  },
  rsvp: {
    enabled: { type: Boolean, default: false },
    deadline: { type: Date, default: null },
    contactPhone: { type: String, default: "" },
  },
  meta: {
    createdAt: { type: Date, default: Date.now },
    expiresAt: { type: Date, default: null },
    views: { type: Number, default: 0 },
    coupleEmail: { type: String, default: "" },
    isPublished: { type: Boolean, default: false },
  },
});

export const Wedding =
  mongoose.models.Wedding ||
  mongoose.model<IWedding>("Wedding", WeddingSchema);
