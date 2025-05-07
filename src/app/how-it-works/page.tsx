import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HowItWorksPage() {
  return (
    <div className="container py-12 mx-auto px-2 md:px-8 lg:px-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-blue-400 bg-clip-text text-transparent">
          How AngelMatch Works
        </h1>
        <p className="text-xl text-gray-600 dark:text-white max-w-3xl mx-auto">
          Connecting founders with the right investors through intelligent
          matching
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* For Founders */}
        <Card className="hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-800 dark:bg-black">
          <CardHeader>
            <CardTitle className="text-2xl bg-gradient-to-r from-blue-500 to-blue-400 bg-clip-text text-transparent">
              For Founders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 bg-blue-100 dark:bg-blue-900/50 rounded-full p-3">
                  <span className="text-blue-500 dark:text-blue-400 font-bold text-xl">
                    1
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Create Your Profile</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Build a compelling startup profile with details about your
                    business, traction, and funding needs.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 bg-blue-100 dark:bg-blue-900/50 rounded-full p-3">
                  <span className="text-blue-500 dark:text-blue-400 font-bold text-xl">
                    2
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Get Matched</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Our AI analyzes your profile and matches you with investors
                    who fit your industry, stage, and vision.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 bg-blue-100 dark:bg-blue-900/50 rounded-full p-3">
                  <span className="text-blue-500 dark:text-blue-400 font-bold text-xl">
                    3
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Connect & Pitch</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Review your matches, request introductions, and pitch to
                    investors who are genuinely interested.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <Button
                asChild
                className="bg-blue-500 hover:bg-blue-600 w-full text-white"
              >
                <Link href="/signup?role=FOUNDER">Get Started as Founder</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* For Investors */}
        <Card className="hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-800 dark:bg-black">
          <CardHeader>
            <CardTitle className="text-2xl bg-gradient-to-r from-blue-500 to-blue-400 bg-clip-text text-transparent">
              For Investors
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 bg-blue-100 dark:bg-blue-900/50 rounded-full p-3">
                  <span className="text-blue-500 dark:text-blue-400 font-bold text-xl">
                    1
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">
                    Set Your Preferences
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Define your investment criteria including industries,
                    stages, and check sizes.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 bg-blue-100 dark:bg-blue-900/50 rounded-full p-3">
                  <span className="text-blue-500 dark:text-blue-400 font-bold text-xl">
                    2
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">
                    Receive Curated Matches
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Get quality deal flow with startups that match your
                    investment thesis.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 bg-blue-100 dark:bg-blue-900/50 rounded-full p-3">
                  <span className="text-blue-500 dark:text-blue-400 font-bold text-xl">
                    3
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Invest & Support</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Connect with promising founders and support the next
                    generation of innovators.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <Button
                asChild
                className="bg-blue-500 hover:bg-blue-600 w-full text-white"
              >
                <Link href="/signup?role=INVESTOR">
                  Get Started as Investor
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Platform Features */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-blue-400 bg-clip-text text-transparent">
          Why AngelMatch Works Better
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <Card className="hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-800 dark:bg-black">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="bg-blue-100 dark:bg-blue-900/50 p-2 rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-blue-500 dark:text-blue-400"
                >
                  <path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z" />
                  <path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
                  <path d="M12 2v2" />
                  <path d="M12 22v-2" />
                  <path d="m17 20.66-1-1.73" />
                  <path d="M11 10.27 7 3.34" />
                  <path d="m20.66 17-1.73-1" />
                  <path d="m3.34 7 1.73 1" />
                  <path d="M14 12h8" />
                  <path d="M2 12h2" />
                  <path d="m20.66 7-1.73 1" />
                  <path d="m3.34 17 1.73-1" />
                  <path d="m17 3.34-1 1.73" />
                  <path d="m11 13.73-4 6.93" />
                </svg>
              </div>
              <span>Smart Matching</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-300">
              Our algorithm evaluates hundreds of data points to connect you
              with the most relevant matches.
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-800 dark:bg-black">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="bg-blue-100 dark:bg-blue-900/50 p-2 rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-blue-500 dark:text-blue-400"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <span>Quality Network</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-300">
              All investors are vetted and all startups are screened to ensure
              quality connections.
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-800 dark:bg-black">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="bg-blue-100 dark:bg-blue-900/50 p-2 rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-blue-500 dark:text-blue-400"
                >
                  <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                  <line x1="16" x2="16" y1="2" y2="6" />
                  <line x1="8" x2="8" y1="2" y2="6" />
                  <line x1="3" x2="21" y1="10" y2="10" />
                  <path d="M8 14h.01" />
                  <path d="M12 14h.01" />
                  <path d="M16 14h.01" />
                  <path d="M8 18h.01" />
                  <path d="M12 18h.01" />
                  <path d="M16 18h.01" />
                </svg>
              </div>
              <span>Time Saving</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-300">
              Skip the cold outreach and get straight to meaningful
              conversations with your ideal matches.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* CTA */}
      <div className="text-center bg-gradient-to-r from-blue-50 to-white dark:from-gray-900 dark:to-black p-8 rounded-xl shadow-sm">
        <h3 className="text-2xl font-semibold mb-4 dark:text-white">
          Ready to find your perfect match?
        </h3>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild className="bg-blue-500 hover:bg-blue-600 text-white">
            <Link href="/signup?role=FOUNDER">Join as Founder</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="text-blue-500 border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/50 dark:text-blue-400 dark:border-blue-400"
          >
            <Link href="/signup?role=INVESTOR">Join as Investor</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}