import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const unwrapped = await params;
    const { id } = unwrapped;
    const investor = await prisma.investor.findUnique({
      where: { id: id },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
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
