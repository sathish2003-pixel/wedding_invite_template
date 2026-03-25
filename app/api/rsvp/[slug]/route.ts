import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { connectDB } from "@/lib/mongodb";
import { RSVP } from "@/models/RSVP";

const rsvpSchema = z.object({
  guestName: z.string().min(2, "Name must be at least 2 characters").max(50),
  guestCount: z.number().min(1).max(4),
  mealPreference: z.enum(["veg", "non-veg"]).optional(),
  message: z.string().max(300).default(""),
});

export async function POST(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const body = await request.json();
    const data = rsvpSchema.parse(body);

    await connectDB();

    const rsvp = await RSVP.create({
      weddingSlug: params.slug,
      ...data,
    });

    return NextResponse.json({
      success: true,
      message: "RSVP submitted successfully",
      data: rsvp,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: "Validation failed", details: error.issues },
        { status: 400 }
      );
    }
    console.error("RSVP submit error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(
  _request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    await connectDB();

    const rsvps = await RSVP.find({ weddingSlug: params.slug })
      .sort({ submittedAt: -1 })
      .lean();

    return NextResponse.json({ success: true, data: rsvps });
  } catch (error) {
    console.error("Fetch RSVPs error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
