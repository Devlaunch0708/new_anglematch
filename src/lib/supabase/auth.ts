import { supabase } from "./client";

import { prisma } from "../prisma";
import { UserRole } from "@/generated/prisma";

export async function signUpWithEmail(
  name: string,
  email: string,
  password: string,
  role: string
) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/confirm`,
      data: {
        name,
        role,
        email_confirm: false,
      },
    },
  });

  if (data.user) {
    await prisma.user.create({
      data: {
        id: data.user.id,
        email: data.user.email as string,
        name,
        role: role as UserRole,
      },
    });
  }

  return { data, error };
}

export async function signInWithEmail(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  return { error };
}

export async function getCurrentUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

export async function updateUserProfile(name: string) {
  const { data, error } = await supabase.auth.updateUser({
    data: { name },
  });
  return { data, error };
}
