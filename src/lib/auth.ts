import { authOptions } from "@/app/api/auth/[...nextauth]/options";

import { getServerSession } from "next-auth";

export async function getCurrentUser() {
  const session = await getServerSession(authOptions);
  return session?.user;
}

export async function requireAuth() {
  const user = await getCurrentUser();
  if (!user) throw new Error("Not authenticated");
  return user;
}

export async function requireRole(role: string) {
  const user = await requireAuth();
  if (user.role !== role) throw new Error(`Requires ${role} role`);
  return user;
}
