"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Startup } from "@/generated/prisma";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import VerificationForm from "@/components/VerificationForm";
import PitchForm from "@/components/PitchForm";

export default function FounderDashboard() {
  const { data: session } = useSession();
  const [startup, setStartup] = useState<Startup | null>(null);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch startup profile
        const startupRes = await fetch("/api/startups");
        if (startupRes.ok) {
          const startups = await startupRes.json();
          const userStartup = startups.find(
            (s: any) => s.userId === session?.user._id
          );
          setStartup(userStartup);
        }

        // Fetch matches
        const matchesRes = await fetch("/api/matches?type=startup");
        if (matchesRes.ok) {
          const matchesData = await matchesRes.json();
          setMatches(matchesData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (session) {
      fetchData();
    }
  }, [session]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (session?.user?.verificationStatus !== "APPROVED") {
    return (
      <div className="container mx-auto p-8 max-w-3xl">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="border-b border-gray-200 bg-gradient-to-r from-blue-500 to-blue-600 p-6">
            <h1 className="text-3xl font-bold text-white">
              Founder Verification
            </h1>
            <p className="text-blue-100 mt-2">
              Please complete your verification to access all features
            </p>
          </div>
          <div className="p-6"></div>
          <VerificationForm userId={session?.user._id as string} />
        </div>
      </div>
    );
  }

  if (session?.user?.verificationStatus === "APPROVED") {
    return (
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8 ">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="border-b border-gray-200 bg-gradient-to-r from-blue-500 to-blue-600 p-6">
              <h1 className="text-3xl font-bold text-white">
                Complete Your Pitch
              </h1>
              <p className="text-blue-100 mt-2">
                Share your startup's story with potential investors
              </p>
            </div>
            <div className="p-6">
              <PitchForm userId={session?.user?._id as string} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Dashboard Header */}
        <div>
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-l-4 border-blue-500">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-blue-500 mb-2">
                Founder Dashboard
              </h1>

              <p className="text-gray-600">
                {startup
                  ? `Welcome back, ${session?.user?.name || "Founder"}!`
                  : "Create your startup profile to begin your funding journey"}
              </p>
            </div>
            {!startup ? (
              <Button
                asChild
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg shadow transition-colors w-full sm:w-auto"
              >
                <Link href="/create-startup">Create Startup Profile</Link>
              </Button>
            ) : (
              <Button
                asChild
                variant="outline"
                className="border-blue-200 text-blue-700 hover:bg-blue-50 px-6 py-2 rounded-lg shadow transition-colors w-full sm:w-auto"
              >
                <Link href={`/startups/${startup.id}`}>View Profile</Link>
              </Button>
            )}
          </div>

          {/* Main Content */}
          {!startup ? (
            <Card className="rounded-xl overflow-hidden shadow-md border-0 hover:shadow-lg transition-shadow">
              <div className="h-2 bg-blue-500"></div>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-bold text-gray-900">
                  Complete Your Startup Profile
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                  <div className="flex items-center justify-center bg-blue-50 h-16 w-16 rounded-xl">
                    <svg
                      className="h-8 w-8 text-blue-500"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-600 mb-4">
                      Create your startup profile to start matching with
                      investors. A complete profile increases your chances of
                      connecting with the right investors.
                    </p>
                    <Button
                      asChild
                      className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg shadow transition-colors w-full sm:w-auto"
                    >
                      <Link href="/create-startup">Get Started</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
              <Card className="rounded-xl overflow-hidden shadow-md border-0 hover:shadow-lg transition-shadow lg:col-span-2">
                <div className="h-2 bg-blue-500"></div>
                <CardHeader className="pb-2">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                    <CardTitle className="text-xl font-bold text-gray-900">
                      Your Investor Matches
                    </CardTitle>
                    <span className="text-sm font-medium bg-blue-100 text-blue-800 py-1 px-3 rounded-full">
                      {matches.length}{" "}
                      {matches.length === 1 ? "Match" : "Matches"}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  {matches.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                      <div className="bg-blue-50 p-4 rounded-full mb-4">
                        <svg
                          className="h-10 w-10 text-blue-500"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <p className="text-gray-600 max-w-md mx-auto">
                        You don't have any matches yet. We're actively searching
                        for compatible investors for your startup.
                      </p>
                      <Button className="mt-4 bg-white border border-blue-200 text-blue-700 hover:bg-blue-50 px-4 py-2 rounded-lg shadow transition-colors">
                        Refresh Matches
                      </Button>
                    </div>
                  ) : (
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {matches.map((match: any) => (
                        <Card
                          key={match.id}
                          className="rounded-lg shadow-sm border border-gray-100 hover:shadow-lg transition-shadow bg-white"
                        >
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg font-semibold text-gray-900">
                              {match.investor.user.name}
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="mb-3">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-sm text-gray-500">
                                  Match Score
                                </span>
                                <span className="text-sm font-semibold text-blue-700">
                                  {match.matchScore.toFixed(1)}%
                                </span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-blue-500 rounded-full h-2"
                                  style={{ width: `${match.matchScore}%` }}
                                ></div>
                              </div>
                            </div>
                            <Button
                              asChild
                              variant="outline"
                              className="w-full mt-2 border-blue-200 text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                            >
                              <Link href={`/investors/${match.investor.id}`}>
                                View Investor
                              </Link>
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Profile Overview Card */}
              <Card className="rounded-xl overflow-hidden shadow-md border-0 hover:shadow-lg transition-shadow col-span-1">
                <div className="h-2 bg-blue-500"></div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl font-bold text-gray-900">
                    Profile Completion
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-blue-50 rounded-xl p-6">
                    <div className="flex items-center mb-4">
                      <div className="p-2 bg-blue-100 rounded-md mr-3">
                        <svg
                          className="h-6 w-6 text-blue-600"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <h3 className="font-medium text-gray-900">
                        Profile Status
                      </h3>
                    </div>
                    <div className="w-full bg-white rounded-full h-2 mb-2">
                      <div className="bg-blue-500 rounded-full h-2 w-full"></div>
                    </div>
                    <p className="text-sm text-gray-600">
                      Your profile is complete and visible to investors
                    </p>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <Button
                      asChild
                      className="bg-white border border-blue-200 text-blue-700 hover:bg-blue-50 px-4 py-2 rounded-lg shadow transition-colors"
                    >
                      <Link href={`/startups/${startup.id}/edit`}>
                        Edit Profile
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Profile Views Card */}
              <Card className="rounded-xl overflow-hidden shadow-md border-0 hover:shadow-lg transition-shadow col-span-1">
                <div className="h-2 bg-blue-500"></div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl font-bold text-gray-900">
                    Profile Analytics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-blue-50 rounded-xl p-6">
                    <div className="flex items-center mb-4">
                      <div className="p-2 bg-blue-100 rounded-md mr-3">
                        <svg
                          className="h-6 w-6 text-blue-600"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      </div>
                      <h3 className="font-medium text-gray-900">
                        Monthly Views
                      </h3>
                    </div>
                    <p className="text-3xl font-bold text-blue-700 mb-2">27</p>
                    <p className="text-sm text-gray-600">
                      Investors have viewed your profile this month
                    </p>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <Button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow transition-colors">
                      View Analytics
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
