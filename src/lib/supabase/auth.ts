import { supabase } from "./client";

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
        email_confirm: false, // Custom metadata
      },
    },
  });

  // Add user to public profiles table
  if (data.user) {
    await supabase.from("profiles").upsert({
      id: data.user.id,
      email: data.user.email,
      name,
      role,
      email_verified: false,
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
