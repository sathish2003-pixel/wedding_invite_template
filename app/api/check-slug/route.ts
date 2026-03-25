import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { connectDB } from "@/lib/mongodb";
import { Wedding } from "@/models/Wedding";

const checkSlugSchema = z.object({
  slug: z.string().min(3).max(80),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { slug } = checkSlugSchema.parse(body);

    await connectDB();

    const existing = await Wedding.findOne({ slug }).lean();

    if (existing) {
      const suggestion = `${slug}-${Math.floor(Math.random() * 99) + 1}`;
      return NextResponse.json({
        available: false,
        suggestion,
      });
    }

    return NextResponse.json({ available: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { available: false, error: "Invalid slug format" },
        { status: 400 }
      );
    }
    console.error("Check slug error:", error);
    return NextResponse.json(
      { available: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
