"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ConfirmPage() {
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("Confirming your email...");
  const searchParams = useSearchParams();

  useEffect(() => {
    const confirmEmail = async () => {
      const accessToken = searchParams.get("access_token");
      const refreshToken = searchParams.get("refresh_token");
      const type = searchParams.get("type");

      if (type === "signup" && accessToken && refreshToken) {
        try {
          const { data, error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });

          if (error) throw error;

          // Update user in Prisma
          await prisma.user.update({
            where: { id: data.user?.id },
            data: {
              emailVerified: new Date(),
              email: data.user?.email,
            },
          });

          setMessage("Email successfully confirmed! Redirecting...");
          setTimeout(() => (window.location.href = "/dashboard"), 2000);
        } catch (error) {
          setMessage("Invalid or expired confirmation link");
        } finally {
          setLoading(false);
        }
      }
    };

    confirmEmail();
  }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <h1 className="text-2xl font-bold">Email Confirmation</h1>
        </CardHeader>
        <CardContent className="text-center">
          <p className="mb-4">{message}</p>
          {!loading && (
            <Button asChild className="bg-purple-600 hover:bg-purple-700">
              <Link href="/login">Return to Login</Link>
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
