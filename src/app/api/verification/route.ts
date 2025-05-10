import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/options";

export async function POST(req: NextRequest) {
  const data = await req.json();
  console.log(data);

  try {
    // Assuming you have a Prisma model for verification documents
    const createVerification = await prisma.verification.create({
      data: {
        userId: data.userId,
        documents: data.documents,
        status: data.status,
      },
    });
    return NextResponse.json(
      { verification: createVerification },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const user = session?.user;
    if (user?.role !== "ADMIN") {
      return NextResponse.json({ error: "Not authorized" }, { status: 403 });
    }
    const data = await prisma.verification.findMany({
      where: { status: "PENDING" },
      include: { user: { select: { email: true } } },
    });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
