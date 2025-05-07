"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
// import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateInvestorPage() {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [focusAreas, setFocusAreas] = useState("");
  const [investmentRange, setInvestmentRange] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  // const { data: session } = useSession();
  const session = true;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/investors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          bio,
          focusAreas: focusAreas.split(",").map((area) => area.trim()),
          investmentRange,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create investor profile");
      }

      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create profile");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!session) {
    return (
      <div className="flex justify-center items-center h-64">
        <p>Please sign in to create an investor profile.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Header Section */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-blue-500">
              Create Investor Profile
            </h1>
            <p className="text-gray-600 max-w-lg mx-auto">
              Tell us about yourself and your investment preferences to connect with the right startups.
            </p>
          </div>

          {/* Card Container */}
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
            {error && (
              <div className="p-4 mb-6 text-sm text-red-700 bg-red-50 rounded-lg border border-red-200">
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-red-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
                  </svg>
                  {error}
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-gray-800 font-medium block mb-1">Full Name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-200"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <Label htmlFor="bio" className="text-gray-800 font-medium block mb-1">Professional Bio</Label>
                  <Textarea
                    id="bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    required
                    rows={5}
                    className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-200"
                    placeholder="Tell us about your investment experience and philosophy..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="focusAreas" className="text-gray-800 font-medium block mb-1">Investment Focus Areas</Label>
                    <Input
                      id="focusAreas"
                      value={focusAreas}
                      onChange={(e) => setFocusAreas(e.target.value)}
                      required
                      className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-200"
                      placeholder="e.g., FinTech, HealthTech, AI"
                    />
                    <p className="text-xs text-gray-500 mt-1">Separate multiple areas with commas</p>
                  </div>

                  <div>
                    <Label htmlFor="investmentRange" className="text-gray-800 font-medium block mb-1">Investment Range</Label>
                    <Input
                      id="investmentRange"
                      value={investmentRange}
                      onChange={(e) => setInvestmentRange(e.target.value)}
                      required
                      className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-200"
                      placeholder="e.g., $50k - $500k"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100">
                <div className="flex flex-col sm:flex-row-reverse gap-3">
                  <Button
                    type="submit"
                    className="px-6 py-2.5 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg shadow-sm transition duration-200 focus:ring-4 focus:ring-blue-200"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Creating...
                      </span> : 
                      "Create Profile"
                    }
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.push("/dashboard")}
                    className="px-6 py-2.5 bg-white text-gray-800 border border-gray-300 hover:bg-gray-50 font-medium rounded-lg transition duration-200 focus:ring-4 focus:ring-gray-200"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </form>
          </div>

          {/* Helpful Tips Card */}
          <div className="mt-6 bg-blue-50 border border-blue-100 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-blue-700 mb-2">Tips for a great profile</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li className="flex items-start">
                <svg className="h-4 w-4 text-blue-500 mt-0.5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Include specific sectors and stages you typically invest in
              </li>
              <li className="flex items-start">
                <svg className="h-4 w-4 text-blue-500 mt-0.5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Mention any previous investments or portfolio companies
              </li>
              <li className="flex items-start">
                <svg className="h-4 w-4 text-blue-500 mt-0.5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Describe your value-add beyond capital
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
