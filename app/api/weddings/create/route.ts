import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { connectDB } from "@/lib/mongodb";
import { Wedding } from "@/models/Wedding";
import { generateSlug } from "@/lib/slugGenerator";

const eventSchema = z.object({
  name: z.string().min(1),
  date: z.string().min(1),
  time: z.string().min(1),
  venueName: z.string().min(1),
  venueAddress: z.string().min(1),
  mapsLink: z.string().default(""),
  dressCode: z.string().default(""),
});

const createWeddingSchema = z.object({
  brideName: z.string().min(1, "Bride name is required"),
  groomName: z.string().min(1, "Groom name is required"),
  brideFamily: z.string().default(""),
  groomFamily: z.string().default(""),
  loveStory: z.string().max(1000).default(""),
  couplePhoto: z.string().default(""),
  hashtag: z.string().default(""),
  customMessage: z.string().max(300).default(""),
  language: z.enum(["en", "hi", "ta", "te", "kn", "ml"]).default("en"),
  events: z.array(eventSchema).min(1),
  gallery: z.array(z.string()).max(8).default([]),
  template: z.number().min(1).max(6).default(1),
  colorTheme: z
    .enum(["rose-gold", "royal-blue", "emerald", "midnight", "blush", "saffron"])
    .default("rose-gold"),
  musicEnabled: z.boolean().default(false),
  musicTrack: z.string().nullable().default(null),
  rsvpEnabled: z.boolean().default(false),
  rsvpDeadline: z.string().default(""),
  plan: z.enum(["free", "premium", "premium_plus"]).default("free"),
  slug: z.string().default(""),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = createWeddingSchema.parse(body);

    await connectDB();

    // Generate slug
    const mainEventDate = data.events[0]?.date;
    let slug = data.slug || generateSlug(data.brideName, data.groomName, mainEventDate);

    // Ensure slug is unique
    let existing = await Wedding.findOne({ slug });
    while (existing) {
      slug = generateSlug(data.brideName, data.groomName, mainEventDate);
      existing = await Wedding.findOne({ slug });
    }

    // Calculate expiry
    let expiresAt: Date | null = null;
    if (data.plan === "free") {
      expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    } else if (data.plan === "premium") {
      expiresAt = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);
    }

    const wedding = await Wedding.create({
      slug,
      plan: data.plan,
      couple: {
        brideName: data.brideName,
        groomName: data.groomName,
        brideFamily: data.brideFamily,
        groomFamily: data.groomFamily,
        loveStory: data.loveStory,
        couplePhoto: data.couplePhoto,
        hashtag: data.hashtag,
        customMessage: data.customMessage,
        language: data.language,
      },
      events: data.events.map((e) => ({
        ...e,
        date: new Date(e.date),
      })),
      gallery: data.gallery,
      design: {
        template: data.template,
        colorTheme: data.colorTheme,
        musicTrack: data.musicTrack,
        musicEnabled: data.musicEnabled,
      },
      rsvp: {
        enabled: data.rsvpEnabled,
        deadline: data.rsvpDeadline ? new Date(data.rsvpDeadline) : null,
      },
      meta: {
        expiresAt,
        isPublished: true,
      },
    });

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    return NextResponse.json({
      success: true,
      slug: wedding.slug,
      previewUrl: `${baseUrl}/wedding/${wedding.slug}`,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: "Validation failed", details: error.issues },
        { status: 400 }
      );
    }
    console.error("Create wedding error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
