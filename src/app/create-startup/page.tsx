"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
// import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateStartupPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [website, setWebsite] = useState("");
  const [industry, setIndustry] = useState("");
  const [stage, setStage] = useState("");
  const [fundingGoal, setFundingGoal] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  // const { data: session } = useSession();
  const session = true; /// temporary 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/startups", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          description,
          website,
          industry,
          stage,
          fundingGoal: parseFloat(fundingGoal),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create startup profile");
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
        <p>Please sign in to create a startup profile.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500/5 via-blue-300/5 to-white">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white shadow-2xl rounded-xl border border-blue-100 dark:border-blue-900 dark:bg-gray-900 p-8">
            <div className="mb-8">
              <h1 className="text-3xl font-extrabold bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent mb-2">
                Create Startup Profile
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Complete the form below to register your startup on AngelMatch
              </p>
            </div>

            {error && (
              <div className="p-4 mb-6 text-sm text-red-700 bg-red-50 rounded-lg dark:bg-red-900/20 dark:text-red-100 border-l-4 border-red-500 flex items-center">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 mr-2" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" 
                    clipRule="evenodd" 
                  />
                </svg>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium text-gray-800 dark:text-gray-200">
                    Startup Name *
                  </Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="Your company name"
                    className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website" className="text-sm font-medium text-gray-800 dark:text-gray-200">
                    Website
                  </Label>
                  <Input
                    id="website"
                    type="url"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    placeholder="https://example.com"
                    className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm font-medium text-gray-800 dark:text-gray-200">
                  Description *
                </Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  rows={5}
                  placeholder="Briefly describe your startup, its mission, and value proposition..."
                  className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="industry" className="text-sm font-medium text-gray-800 dark:text-gray-200">
                    Industry *
                  </Label>
                  <Input
                    id="industry"
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    required
                    placeholder="e.g., FinTech, HealthTech, SaaS"
                    className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="stage" className="text-sm font-medium text-gray-800 dark:text-gray-200">
                    Stage *
                  </Label>
                  <select
                    id="stage"
                    value={stage}
                    onChange={(e) => setStage(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <option value="" disabled>Select your startup stage</option>
                    <option value="Idea">Idea</option>
                    <option value="Pre-seed">Pre-seed</option>
                    <option value="Seed">Seed</option>
                    <option value="Series A">Series A</option>
                    <option value="Series B">Series B</option>
                    <option value="Series C+">Series C+</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="fundingGoal" className="text-sm font-medium text-gray-800 dark:text-gray-200">
                  Funding Goal ($) *
                </Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <span className="text-gray-500 dark:text-gray-400">$</span>
                  </div>
                  <Input
                    id="fundingGoal"
                    type="number"
                    value={fundingGoal}
                    onChange={(e) => setFundingGoal(e.target.value)}
                    required
                    placeholder="e.g., 500000"
                    className="w-full pl-8 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Enter the total funding amount you're seeking in USD</p>
              </div>

              <div className="pt-6 border-t border-gray-200 dark:border-gray-800 flex justify-end gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push("/dashboard")}
                  className="px-6 border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className={`px-6 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all ${
                    isSubmitting ? "opacity-80 cursor-not-allowed" : ""
                  }`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creating...
                    </div>
                  ) : (
                    "Create Profile"
                  )}
                </Button>
              </div>
            </form>
          </div>
          
          <div className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
            Need help? <a href="/help" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">Contact our support team</a>
          </div>
        </div>
      </div>
    </div>
  );
}