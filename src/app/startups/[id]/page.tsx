import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function StartupProfile({
  params,
}: {
  params: { id: string };
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const startup = await prisma.startup.findUnique({
    where: { id: params.id },
    include: {
      user: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });

  if (!startup) {
    return (
      <div className="container py-8 bg-white">
        <h1 className="text-2xl font-bold text-black">Startup not found</h1>
      </div>
    );
  }

  const isOwner = user._id === startup.userId;

  return (
    <div className="container py-8 bg-white mx-auto px-2 md:px-8 lg:px-16">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h1 className="text-3xl font-bold text-blue-500">
          {startup.name}
        </h1>
        {isOwner && (
          <Button asChild variant="outline" className="border-blue-500 text-blue-500 hover:bg-blue-50">
            <Link href={`/startups/${startup.id}/edit`}>Edit Profile</Link>
          </Button>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border border-gray-200 shadow-md overflow-hidden">
          <CardHeader className="border-b border-gray-200">
            <CardTitle className="text-black">About</CardTitle>
          </CardHeader>
          <CardContent className="p-5">
            <p className="text-gray-600 mb-6">
              {startup.description}
            </p>
            <div className="space-y-3 border-t border-gray-200 pt-4">
              <p className="flex flex-wrap items-center">
                <span className="font-medium text-black w-28">Industry:</span>
                <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-500">
                  {startup.industry}
                </span>
              </p>
              <p className="flex flex-wrap items-center">
                <span className="font-medium text-black w-28">Stage:</span>
                <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
                  {startup.stage}
                </span>
              </p>
              <p>
                <span className="font-medium text-black">Funding Goal:</span>{" "}
                <span className="text-blue-500 font-semibold">${startup.fundingGoal.toLocaleString()}</span>
              </p>
              {startup.website && (
                <p className="flex flex-wrap items-center gap-1">
                  <span className="font-medium text-black">Website:</span>{" "}
                  <Link
                    href={startup.website}
                    className="text-blue-500 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {startup.website}
                  </Link>
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 shadow-md overflow-hidden">
          <CardHeader className="border-b border-gray-200">
            <CardTitle className="text-black">Contact</CardTitle>
          </CardHeader>
          <CardContent className="p-5">
            <div className="space-y-3 mb-6">
              <p className="flex flex-wrap items-center">
                <span className="font-medium text-black w-28">Founder:</span>{" "}
                <span>{startup.user.name}</span>
              </p>
              <p className="flex flex-wrap items-center">
                <span className="font-medium text-black w-28">Email:</span>{" "}
                <span>{startup.user.email}</span>
              </p>
            </div>
            {!isOwner && user.role === "INVESTOR" && (
              <div className="pt-4 border-t border-gray-200">
                <Button className="mt-2 bg-blue-500 hover:bg-blue-600 text-white">
                  Request Connection
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}