"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function VerificationForm({ userId }: { userId: string }) {
  const [files, setFiles] = useState<File[]>([]);
  const [businessUrl, setBusinessUrl] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const uploads = await Promise.all(
        files.map(async (file) => {
          const { data, error } = await supabase.storage
            .from("verification-documents")
            .upload(`${userId}/${file.name}`, file);
          if (error) throw error;
          return data.path;
        })
      );

      const response = await fetch("/api/verification", {
        method: "POST",
        body: JSON.stringify({
          userId,
          documents: { files: uploads, businessUrl },
          status: "PENDING",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to submit verification");
      }
    } catch (error: any) {
      console.error("Error uploading files:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="documents">
          Upload Documents (ID, Business Registration)
        </Label>
        <Input
          id="documents"
          type="file"
          multiple
          onChange={handleFileChange}
          accept=".pdf,.jpg,.png"
        />
      </div>
      <div>
        <Label htmlFor="businessUrl">Business Website or LinkedIn</Label>
        <Input
          id="businessUrl"
          type="url"
          value={businessUrl}
          onChange={(e) => setBusinessUrl(e.target.value)}
        />
      </div>
      <Button type="submit">Submit Verification</Button>
    </form>
  );
}
