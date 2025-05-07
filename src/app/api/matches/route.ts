import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { error } from "console";

export async function POST(req: Request) {
  try {
    const user = await requireAuth();
    const { startupId, investorId } = await req.json();

    // Check if user owns either the startup or investor profile
    const startup = await prisma.startup.findUnique({
      where: { id: startupId },
    });
    const investor = await prisma.investor.findUnique({
      where: { id: investorId },
    });

    if (!startup && !investor) {
      throw new Error("Startup or investor not found");
    }

    if (
      (startup && startup.userId !== user._id) ||
      (investor && investor.userId !== user._id)
    ) {
      throw new Error("Not authorized to create this match");
    }

    const match = await prisma.match.create({
      data: {
        startupId,
        investorId,
        matchScore: calculateMatchScore(startup!, investor!),
        status: "PENDING",
      },
    });

    return NextResponse.json(match);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const user = await requireAuth();
    const url = new URL(req.url);
    const type = url.searchParams.get("type");

    let matches;
    if (type === "startup") {
      const startup = await prisma.startup.findUnique({
        where: {
          userId: user._id?.toString(),
        },
      });
      if (!startup)
        return NextResponse.json(
          { error: "Startup profile not found" },
          { status: 403 }
        );

      matches = await prisma.match.findMany({
        where: { startupId: startup.id },
        include: {
          investor: {
            include: {
              user: {
                select: {
                  name: true,
                  email: true,
                },
              },
            },
          },
        },
      });
    } else if (type === "investor") {
      const investor = await prisma.investor.findUnique({
        where: { userId: user._id?.toString() },
      });
      if (!investor)
        return NextResponse.json(
          { error: "Investor profile not found" },
          { status: 403 }
        );

      matches = await prisma.match.findMany({
        where: { investorId: investor.id },
        include: {
          startup: {
            include: {
              user: {
                select: {
                  name: true,
                  email: true,
                },
              },
            },
          },
        },
      });
    } else {
      return NextResponse.json({ error: "Invalid type" }, { status: 400 });
    }

    return NextResponse.json(matches);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

function calculateMatchScore(startup: any, investor: any): number {
  // Simple matching algorithm - can be enhanced
  let score = 0;

  // Industry match
  if (investor.focusAreas.includes(startup.industry)) {
    score += 40;
  }

  // Stage match (simplified)
  if (
    startup.stage === "Seed" &&
    investor.investmentRange.includes("50k-500k")
  ) {
    score += 30;
  } else if (
    startup.stage === "Series A" &&
    investor.investmentRange.includes("500k-2M")
  ) {
    score += 30;
  }

  // Random factor to make it interesting
  score += Math.random() * 30;

  return Math.min(100, score);
}
