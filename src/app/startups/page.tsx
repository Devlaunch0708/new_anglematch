"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Startup } from "@/generated/prisma";

export default function StartupsPage() {
  const { data: session } = useSession();
  const [startups, setStartups] = useState<Startup[]>([]);
  const [filteredStartups, setFilteredStartups] = useState<Startup[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [industryFilter, setIndustryFilter] = useState("");

  useEffect(() => {
    const fetchStartups = async () => {
      try {
        const response = await fetch("/api/startups");
        if (response.ok) {
          const data = await response.json();
          setStartups(data);
          setFilteredStartups(data);
        }
      } catch (error) {
        console.error("Error fetching startups:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStartups();
  }, []);

  useEffect(() => {
    let results = startups;

    if (searchTerm) {
      results = results.filter(
        (startup) =>
          startup.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          startup.description
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          startup.industry.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (industryFilter) {
      results = results.filter(
        (startup) =>
          startup.industry.toLowerCase() === industryFilter.toLowerCase()
      );
    }

    setFilteredStartups(results);
  }, [searchTerm, industryFilter, startups]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const industries = Array.from(new Set(startups.map((s) => s.industry)));

  return (
    <div className="container py-8 bg-white mx-auto px-2 md:px-8 lg:px-16">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-blue-500">
          Startup Directory
        </h1>

        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <Input
            placeholder="Search startups..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-64 border-blue-500 focus:ring-blue-500"
          />
          <select
            value={industryFilter}
            onChange={(e) => setIndustryFilter(e.target.value)}
            className="border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 border-blue-500"
          >
            <option value="">All Industries</option>
            {industries.map((industry) => (
              <option key={industry} value={industry}>
                {industry}
              </option>
            ))}
          </select>
        </div>
      </div>

      {filteredStartups.length === 0 ? (
        <Card className="border border-blue-500 shadow-md">
          <CardHeader >
            <CardTitle className="text-blue-500">No Startups Found</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              {searchTerm || industryFilter
                ? "Try adjusting your search criteria"
                : "No startups are currently registered"}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filteredStartups.map((startup) => (
            <Card
              key={startup.id}
              className="hover:shadow-lg transition-shadow border border-gray-200 overflow-hidden"
            >
              <CardHeader className="border-b border-gray-200">
                <CardTitle className="text-black">{startup.name}</CardTitle>
                <div className="flex flex-wrap items-center gap-2 mt-2">
                  <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-500">
                    {startup.industry}
                  </span>
                  <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
                    {startup.stage}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <p className="text-gray-600 line-clamp-3 mb-4 h-16">
                  {startup.description}
                </p>
                <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                  <p className="font-medium text-black">
                    ${startup.fundingGoal.toLocaleString()} Goal
                  </p>
                  <Button asChild variant="outline" className="border-blue-500 text-blue-500 hover:bg-blue-50">
                    <Link href={`/startups/${startup.id}`}>View Details</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {session?.user.role === "FOUNDER" && (
        <div className="mt-8 flex justify-center">
          <Button asChild className="bg-blue-500 hover:bg-blue-600 text-white">
            <Link href="/create-startup">Add Your Startup</Link>
          </Button>
        </div>
      )}
    </div>
  );
}