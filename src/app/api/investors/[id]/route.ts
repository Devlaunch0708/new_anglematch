import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";

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

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    const user = session?.user;
    const data = await req.json();
    const unwrapped = await params;
    const { id } = unwrapped;

    // Check if investor exists and belongs to user
    const existingInvestor = await prisma.investor.findUnique({
      where: { id: id },
    });

    if (!existingInvestor) {
      return NextResponse.json(
        { error: "Investor not found" },
        { status: 404 }
      );
    }

    if (existingInvestor.userId !== user?._id) {
      return NextResponse.json(
        { error: "Not authorized to edit this profile" },
        { status: 403 }
      );
    }

    const updatedInvestor = await prisma.investor.update({
      where: { id: id },
      data: {
        name: data.name,
        bio: data.bio,
        focusAreas: data.focusAreas,
        investmentRange: data.investmentRange,
      },
    });

    return NextResponse.json(updatedInvestor);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
