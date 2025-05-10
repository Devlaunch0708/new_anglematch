import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";

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

    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ error: "Not authorized" }, { status: 403 });
    }

    const existingInvestor = await prisma.verification.findUnique({
      where: { id: id },
    });

    if (!existingInvestor) {
      return NextResponse.json(
        { error: "Verification not found" },
        { status: 404 }
      );
    }
    const updatedInvestorOrFounder = await prisma.verification.update({
      where: { id: id },
      data: {
        status: data.status,
        reviewedAt: new Date(),
        user: {
          update: {
            verificationStatus: data.status,
          },
        },
      },
    });

    return NextResponse.json(updatedInvestorOrFounder);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
