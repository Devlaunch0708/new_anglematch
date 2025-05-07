import { NextResponse } from "next/server";
import { requireRole } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const user = await requireRole("FOUNDER");
    const data = await req.json();

    const existingStartup = await prisma.startup.findUnique({
      where: { userId: user._id?.toString() },
    });

    if (existingStartup) {
      return NextResponse.json(
        { error: "You already have a startup profile" },
        { status: 400 }
      );
    }

    const startup = await prisma.startup.create({
      data: {
        ...data,
        userId: user._id,
      },
    });

    return NextResponse.json(startup);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const startups = await prisma.startup.findMany({
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json(startups);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
