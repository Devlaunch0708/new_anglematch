import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const pitch = await prisma.pitch.create({
      data: {
        ...data,
        userId: data.userId,
        status: "DRAFT",
      },
    });

    return NextResponse.json(pitch);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const pitches = await prisma.pitch.findMany({
      where: { status: "PUBLISHED" },
    });

    return NextResponse.json(pitches);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
