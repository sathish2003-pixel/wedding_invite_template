import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Wedding } from "@/models/Wedding";

export async function GET(
  _request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    await connectDB();

    const wedding = await Wedding.findOneAndUpdate(
      { slug: params.slug },
      { $inc: { "meta.views": 1 } },
      { new: true }
    ).lean();

    if (!wedding) {
      return NextResponse.json(
        { success: false, error: "Wedding not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: wedding });
  } catch (error) {
    console.error("Fetch wedding error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
