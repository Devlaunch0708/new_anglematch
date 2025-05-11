import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import FounderDashboard from "./founder-dashboard";
import InvestorDashboard from "./investor-dashboard";
import AdminDashboard from "./admin";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  // // REMOVE IN PRODUCTION - Dummy user for testing DUMMY
  // const dummyUser = {
  //   id: "1",
  //   name: "Test User",
  //   email: "test@example.com",
  //   role: "INVESTOR",
  //   // role: "FOUNDER",
  // };
  // // Comment out the real user and use dummy for testing
  // // const user = dummyUser;
  return (
    <div className="min-h-screen">
      {user.role === "ADMIN" ? (
        <AdminDashboard />
      ) : user.role === "FOUNDER" ? (
        <FounderDashboard />
      ) : (
        <InvestorDashboard />
      )}
    </div>
  );
}
