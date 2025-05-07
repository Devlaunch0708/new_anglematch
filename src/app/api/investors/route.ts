import { NextResponse } from "next/server";
import { requireRole } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const user = await requireRole("INVESTOR");
    const data = await req.json();

    const existingInvestor = await prisma.investor.findUnique({
      where: { userId: user._id?.toString() },
    });

    if (existingInvestor) {
      return NextResponse.json(
        { error: "You already have an investor profile" },
        { status: 400 }
      );
    }

    const investor = await prisma.investor.create({
      data: {
        ...data,
        userId: user._id?.toString(),
      },
    });

    return NextResponse.json(investor);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const investors = await prisma.investor.findMany({
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json(investors);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
