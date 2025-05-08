"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import * as z from "zod";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  bio: z.string().min(10, "Bio must be at least 10 characters"),
  focusAreas: z.string().min(2, "Enter at least one focus area"),
  investmentRange: z.string().min(2, "Investment range is required"),
});

export default function EditInvestorProfile({
  params,
}: {
  params: { id: string };
}) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: async () => {
      try {
        const response = await fetch(`/api/investors/${params.id}`);
        if (!response.ok) throw new Error("Failed to fetch investor data");

        const data = await response.json();
        return {
          name: data.name,
          bio: data.bio,
          focusAreas: data.focusAreas.join(", "),
          investmentRange: data.investmentRange,
        };
      } catch (err) {
        console.error("Error fetching investor data:", err);
        return {
          name: "",
          bio: "",
          focusAreas: "",
          investmentRange: "",
        };
      }
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`/api/investors/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          focusAreas: values.focusAreas.split(",").map((area) => area.trim()),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update profile");
      }

      router.push(`/investors/${params.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  if (!session) {
    return (
      <div className="flex justify-center items-center h-64">
        <p>Please sign in to edit investor profile.</p>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
          Edit Investor Profile
        </h1>
        <Button
          variant="ghost"
          onClick={() => router.push(`/investors/${params.id}`)}
        >
          Cancel
        </Button>
      </div>

      {error && (
        <div className="p-4 mb-6 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-900 dark:text-red-100">
          {error}
        </div>
      )}

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="max-w-2xl space-y-6"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Investor Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your name or firm name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us about your investment experience, philosophy, and notable investments..."
                    rows={5}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="focusAreas"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Focus Areas (comma separated)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="FinTech, HealthTech, AI, etc."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
                <p className="text-sm text-gray-500 mt-1">
                  List the industries you're most interested in
                </p>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="investmentRange"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Investment Range</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., $50k - $500k" {...field} />
                </FormControl>
                <FormMessage />
                <p className="text-sm text-gray-500 mt-1">
                  Typical check size you write
                </p>
              </FormItem>
            )}
          />

          <div className="flex justify-end gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push(`/investors/${params.id}`)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
