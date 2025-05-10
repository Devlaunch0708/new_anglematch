import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import FounderDashboard from "./founder-dashboard";
import InvestorDashboard from "./investor-dashboard";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen">
      {user.role === "FOUNDER" ? <FounderDashboard /> : <InvestorDashboard />}
    </div>
  );
}
