"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { prisma } from "@/lib/prisma";
import PitchCard from "@/components/PitchCard";
import { set } from "zod";

export default function InvestorDashboard() {
  interface Match {
    id: string;
    startup: {
      id: string;
      name: string;
      industry: string;
    };
    matchScore: number;
  }
  const { data: session } = useSession();
  const [investor, setInvestor] = useState<any>(null);
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [pitches, setPitches] = useState<any[]>([]);
  // Dummy matches data
  const dummyMatches: Match[] = [
    {
      id: "1",
      startup: {
        id: "startup1",
        name: "EcoTech Solutions",
        industry: "Clean Energy",
      },
      matchScore: 92.5,
    },
    {
      id: "2",
      startup: {
        id: "startup2",
        name: "HealthAI",
        industry: "Healthcare Technology",
      },
      matchScore: 87.8,
    },
    {
      id: "3",
      startup: {
        id: "startup3",
        name: "FinServe",
        industry: "Financial Technology",
      },
      matchScore: 85.2,
    },
  ];

  // Dummy pitch data
  const dummyPitches = [
    {
      id: "1",
      title: "Eco-Friendly Smart Home Solutions",
      description: "Developing IoT devices for sustainable home automation",
      industry: "Green Technology",
      fundingGoal: 500000,
      equity: "10%",
      stage: "Seed",
      location: "San Francisco, CA",
      teamSize: 5,
      marketSize: "$50B",
      traction: "1000+ beta users, $100K ARR",
    },
    {
      id: "2",
      title: "AI-Powered Healthcare Diagnostics",
      description: "Machine learning platform for early disease detection",
      industry: "Healthcare",
      fundingGoal: 1000000,
      equity: "15%",
      stage: "Series A",
      location: "Boston, MA",
      teamSize: 12,
      marketSize: "$200B",
      traction: "5 hospital partnerships, 10K patient scans",
    },
    {
      id: "3",
      title: "Blockchain Supply Chain Platform",
      description: "Transparent tracking system for global logistics",
      industry: "Supply Chain",
      fundingGoal: 750000,
      equity: "12%",
      stage: "Seed",
      location: "Singapore",
      teamSize: 8,
      marketSize: "$100B",
      traction: "3 enterprise clients, $250K pipeline",
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch investor profile
        const investorRes = await fetch("/api/investors");
        if (investorRes.ok) {
          const investors = await investorRes.json();
          const userInvestor = investors.find(
            (i: any) => i.userId === session?.user._id
          );
          setInvestor(userInvestor);
        }

        const matchesRes = await fetch("/api/matches?type=investor");
        if (matchesRes.ok) {
          const matchesData = await matchesRes.json();
          // setMatches(matchesData);
          setMatches(dummyMatches); // DUMMY
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

  useEffect(() => {
    const fetchPitches = async () => {
      const data = await fetch("/api/pitches", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());
      // setPitches(data);
      setPitches(dummyPitches); // DUMMY
    };
    fetchPitches();
  }, []);

  const handleConnect = async (pitchId: string) => {
    try {
      const response = await fetch("/api/interactions", {
        method: "POST",
        body: JSON.stringify({
          pitchId,
          userId: session?.user._id,
          type: "INVESTOR_TO_STARTUP",
          status: "PENDING",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to connect to pitch");
      }
    } catch (error: any) {
      console.error("Error connecting to pitch:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  if (session?.user?.verificationStatus !== "APPROVED") {
    return (
      <div className="container mx-auto p-8 max-w-3xl">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="border-b border-gray-200 bg-gradient-to-r from-blue-500 to-blue-600 p-6">
            <h1 className="text-3xl font-bold text-white">
              Investor Verification
            </h1>
            <p className="text-blue-100 mt-2">
              Please complete the verification process to access the investor
              dashboard
            </p>
          </div>
          <div className="p-6">
            <VerificationForm userId={session?.user._id as string} />
          </div>
        </div>
      </div>
    );
  }
  if (session?.user?.verificationStatus === "APPROVED") {
    return (
      <div>
        <div className="bg-white min-h-screen">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="flex justify-between items-center mb-10 border-b border-gray-100 pb-6 flex-wrap">
              <h1 className="sm:text-4xl text-2xl font-bold text-blue-500 mr-auto">
                Investor Dashboard
              </h1>
              {!investor ? (
                <Button
                  asChild
                  className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-2 rounded-lg shadow-md transition-all  my-2"
                >
                  <Link href="/create-investor">Create Investor Profile</Link>
                </Button>
              ) : (
                <Button
                  asChild
                  variant="outline"
                  className="border-blue-500 text-blue-500 hover:bg-blue-50 font-medium px-6 py-2 rounded-lg transition-all  my-2"
                >
                  <Link href={`/investors/${investor.id}`}>View Profile</Link>
                </Button>
              )}
            </div>
            <div className="container mx-auto mb-8">
              <Card className="border border-gray-200 rounded-xl shadow-sm overflow-hidden p-0">
                <CardHeader className="bg-blue-500 border-b border-gray-200 px-6 py-5">
                  <CardTitle className="text-2xl font-semibold text-white">
                    Pitches Card
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-6 py-6">
                  {pitches.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <div className="p-4 rounded-full bg-blue-50 mb-4">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-10 w-10 text-blue-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 9v2m0 4h.01M12 6a9 9 0 100 18 9 9 0 000-18z"
                          />
                        </svg>
                      </div>
                      <p className="text-gray-600 text-lg">
                        You don't have any pithces yet. We'll notify you when we
                        find compatible startups.
                      </p>
                    </div>
                  ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                      {pitches.map((match: any) => (
                        <PitchCard
                          key={match.id}
                          pitch={match}
                          onConnect={() => handleConnect(match.id)}
                        />
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
            {!investor ? (
              <Card className="border border-gray-200 rounded-xl shadow-sm overflow-hidden p-0">
                <CardHeader className="bg-blue-50 border-b border-gray-200 bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-5">
                  <CardTitle className="text-2xl font-semibold text-white">
                    Complete Your Investor Profile
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-6 py-8">
                  <p className="text-gray-600 mb-6 text-lg">
                    Create your investor profile to start matching with
                    startups.
                  </p>
                  <Button
                    asChild
                    className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-8 py-3 rounded-lg shadow-md transition-all m-2 "
                  >
                    <Link href="/create-investor">Get Started</Link>
                  </Button>
                  <Button variant="outline" className="m-2">
                    Find More Startups
                  </Button>
                  <Button variant="outline" className="m-2">
                    View Analytics
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-8">
                <Card className="border border-gray-200 rounded-xl shadow-sm overflow-hidden p-0">
                  <CardHeader className="bg-blue-500 border-b border-gray-200 px-6 py-5">
                    <CardTitle className="text-2xl font-semibold text-white">
                      Your Matches
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="px-6 py-6">
                    {matches.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-12 text-center">
                        <div className="p-4 rounded-full bg-blue-50 mb-4">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-10 w-10 text-blue-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 9v2m0 4h.01M12 6a9 9 0 100 18 9 9 0 000-18z"
                            />
                          </svg>
                        </div>
                        <p className="text-gray-600 text-lg">
                          You don't have any matches yet. We'll notify you when
                          we find compatible startups.
                        </p>
                      </div>
                    ) : (
                      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {matches.map((match: any) => (
                          <Card
                            key={match.id}
                            className="border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-all"
                          >
                            <CardHeader className="bg-white px-5 py-4 border-b border-gray-100">
                              <CardTitle className="text-xl font-semibold text-black">
                                {match.startup.name}
                              </CardTitle>
                              <p className="text-sm text-blue-500 font-medium">
                                {match.startup.industry}
                              </p>
                            </CardHeader>
                            <CardContent className="p-5">
                              <div className="mb-4">
                                <p className="text-gray-600 flex items-center">
                                  Match Score:
                                  <span className="ml-2 font-bold text-blue-500 bg-blue-50 px-2 py-1 rounded-md text-sm">
                                    {match.matchScore.toFixed(1)}%
                                  </span>
                                </p>
                              </div>
                              <div className="flex gap-3 mt-4">
                                <Button
                                  asChild
                                  variant="outline"
                                  className="flex-1 border-gray-200 hover:border-blue-500 hover:bg-white text-black font-medium rounded-lg transition-all"
                                >
                                  <Link href={`/startups/${match.startup.id}`}>
                                    View Startup
                                  </Link>
                                </Button>
                                <Button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg shadow-sm transition-all">
                                  Connect
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card className="border border-gray-200 rounded-xl shadow-sm overflow-hidden p-0">
                  <CardHeader className="bg-blue-500 border-b border-gray-200 px-6 py-0">
                    <CardTitle className="text-2xl font-semibold text-white">
                      Recommended Startups
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="px-6 py-8">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                      <p className="text-gray-600 text-lg">
                        Based on your investment preferences, we'll recommend
                        startups that match your criteria.
                      </p>
                      <Button className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-3 rounded-lg shadow-md transition-all whitespace-nowrap">
                        View Recommendations
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
}
