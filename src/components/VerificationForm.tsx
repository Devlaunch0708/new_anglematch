"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, Link } from "lucide-react"; // Add this import

export default function VerificationForm({ userId }: { userId: string }) {
  const [files, setFiles] = useState<File[]>([]);
  const [businessUrl, setBusinessUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
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
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl  mb-6">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Business Verification
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="documents" className="text-sm font-medium">
            Upload Documents
          </Label>
          <div className="relative">
            <Input
              id="documents"
              type="file"
              multiple
              onChange={handleFileChange}
              accept=".pdf,.jpg,.png"
              className="hidden"
            />
            <div
              onClick={() => document.getElementById("documents")?.click()}
              className="cursor-pointer border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors"
            >
              <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
              <p className="text-sm text-gray-500">
                Drop your files here or click to upload
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Supported formats: PDF, JPG, PNG
              </p>
            </div>
            {files.length > 0 && (
              <div className="mt-2">
                <p className="text-sm text-gray-600">
                  {files.length} file(s) selected
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="businessUrl" className="text-sm font-medium">
            Business Website or LinkedIn
          </Label>
          <div className="relative">
            <Input
              id="businessUrl"
              type="url"
              value={businessUrl}
              onChange={(e) => setBusinessUrl(e.target.value)}
              className="pl-10"
              placeholder="https://your-business.com"
            />
            <Link className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2 transition-colors"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Submitting...
            </span>
          ) : (
            "Submit Verification"
          )}
        </Button>
      </form>
    </div>
  );
}
