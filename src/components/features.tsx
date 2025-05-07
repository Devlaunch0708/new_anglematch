import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ShieldCheck, CheckCircle, Lock, BarChart } from "lucide-react";

const features = [
  {
    title: "AI-Powered Matching",
    description:
      "Our algorithm analyzes thousands of data points to connect you with the most relevant investors.",
    icon: <ShieldCheck className="h-8 w-8 text-blue-500" />,
  },
  {
    title: "Verified Investors",
    description:
      "All investors are vetted to ensure they're active and serious about funding startups.",
    icon: <CheckCircle className="h-8 w-8 text-blue-500" />,
  },
  {
    title: "Secure Introductions",
    description:
      "Communicate safely through our platform until you're ready to share contact details.",
    icon: <Lock className="h-8 w-8 text-blue-500" />,
  },
  {
    title: "Detailed Profiles",
    description:
      "View investor preferences, past investments, and deal terms before connecting.",
    icon: <BarChart className="h-8 w-8 text-blue-500" />,
  },
];

export function Features() {
  return (
    <section className="py-16 bg-white dark:bg-[#111827] text-[#111827] dark:text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Why Founders Love{" "}
            <img
              src="/image/DLlogo.png"
              alt="logo"
              className="inline-block h-14 w-14"
            />
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-400 text-lg">
            We've built the most efficient way to connect with devLaunch
            investors who are a perfect fit for your startup.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="bg-white dark:bg-[#1F2937] border border-gray-100 dark:border-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
            >
              <CardHeader className="pb-2 space-y-4">
                <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-900/20">
                  {feature.icon}
                </div>
                <CardTitle className="text-xl font-semibold text-[#111827] dark:text-white">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
