import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

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
