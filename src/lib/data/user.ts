import { prisma } from "../prisma";

export async function getUserByEmail(email: string) {
  return await prisma.user.findUnique({
    where: { email },
  });
}

export async function createUser(data: {
  name: string;
  email: string;
  password: string;
  role: "FOUNDER" | "INVESTOR";
}) {
  return await prisma.user.create({
    data,
  });
}
