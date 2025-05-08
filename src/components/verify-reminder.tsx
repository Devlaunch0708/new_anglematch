"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { prisma } from "@/lib/prisma";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function VerifyReminder() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const checkVerification = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        const dbUser = await prisma.user.findUnique({
          where: { id: user.id },
        });

        if (dbUser && !dbUser.emailVerified) {
          setEmail(dbUser.email || "");
          setOpen(true);
        }
      }
    };

    checkVerification();
  }, []);

  const resendVerification = async () => {
    const { error } = await supabase.auth.resend({
      type: "signup",
      email,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/confirm`,
      },
    });

    if (!error) {
      alert("Confirmation email resent! Check your inbox.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Verify Your Email</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>We've sent a confirmation email to {email}</p>
          <Button
            onClick={resendVerification}
            className="bg-purple-600 hover:bg-purple-700"
          >
            Resend Confirmation Email
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
