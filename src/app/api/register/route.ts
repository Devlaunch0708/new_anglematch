import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  const data = await req.json();

  try {
    const checkUser = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (checkUser) {
      return NextResponse.json(
        { error: "User Already Exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    data.password = hashedPassword;
    const createUser = await prisma.user.create({
      data,
    });
    return NextResponse.json({ user: createUser }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
