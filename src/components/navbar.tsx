"use client";
import Link from "next/link";
import { useState } from "react";
import { ChevronDown, Menu, User, X } from "lucide-react";
import { useSession, signOut } from "next-auth/react";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-50 w-full bg-[#111827] text-white">
      <div className="container mx-auto px-4 md:px-8 lg:px-16 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <div className="flex items-center">
              <img src="/image/DLlogo.png" alt="Logo" className="w-8 h-8" />
              <span className="ml-2 font-bold text-xl text-white">
                DevLaunch
              </span>
            </div>
          </Link>
        </div>
        <div className="hidden md:flex items-center space-x-6">
          <Link
            href="/startups"
            className="hover:text-blue-400 transition-colors"
          >
            For Startups
          </Link>
          <Link
            href="/investors"
            className="hover:text-blue-400 transition-colors"
          >
            For Investors
          </Link>
          <Link
            href="/how-it-works"
            className="hover:text-blue-400 transition-colors"
          >
            How It Works
          </Link>

          {/* Resources Dropdown - Simplified two-column layout */}
          <div className="relative group">
            <button
              className="hover:text-blue-400 transition-colors flex items-center"
              onClick={() => setIsResourcesOpen(!isResourcesOpen)}
            >
              Resources
              <ChevronDown
                className={`ml-1 h-4 w-4 transition-transform ${
                  isResourcesOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isResourcesOpen && (
              <div className="absolute left-0 mt-2 w-[400px] bg-[#1F2937] rounded-md shadow-lg py-1 z-50">
                <div className="grid grid-cols-2 gap-4 p-4">
                  {/* Left Column */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-blue-400">
                      Resources
                    </h3>
                    <ul className="space-y-2 text-sm">
                      <li>
                        <Link
                          href="/resources/accelerator-hunt"
                          className="hover:text-blue-400"
                        >
                          Accelerator Hunt
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/resources/pitch-deck-database"
                          className="hover:text-blue-400"
                        >
                          Pitch Deck Database
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/resources/investor-database"
                          className="hover:text-blue-400"
                        >
                          Join Investor Database
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/resources/vc-search"
                          className="hover:text-blue-400"
                        >
                          VC Search
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/resources/fundraising-templates"
                          className="hover:text-blue-400"
                        >
                          Fundraising Templates
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/resources/publication"
                          className="hover:text-blue-400"
                        >
                          Publication
                        </Link>
                      </li>
                    </ul>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-blue-400">
                      Pricing
                    </h3>
                    <ul className="space-y-2 text-sm">
                      <li>
                        <Link
                          href="/resources/pitch-perfect"
                          className="hover:text-blue-400"
                        >
                          Pitch Perfect
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/resources/calculators"
                          className="hover:text-blue-400"
                        >
                          Calculators
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/resources/ai-email-generator"
                          className="hover:text-blue-400"
                        >
                          AI Email Generator
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/resources/elevator-pitch-generator"
                          className="hover:text-blue-400"
                        >
                          Elevator Pitch Generator
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/resources/fundraising-glossary"
                          className="hover:text-blue-400"
                        >
                          Fundraising Glossary
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/resources/email-templates"
                          className="hover:text-blue-400"
                        >
                          Email Templates
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Bottom Section */}
                <div className="border-t border-gray-700 p-4">
                  <h3 className="text-sm font-semibold text-blue-400 mb-2">
                    Calculators
                  </h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <Link
                      href="/resources/valuation-calculator"
                      className="hover:text-blue-400"
                    >
                      Valuation Calculator
                    </Link>
                    <Link
                      href="/resources/burn-rate-calculator"
                      className="hover:text-blue-400"
                    >
                      Burn Rate Calculator
                    </Link>
                    <Link
                      href="/resources/runway-calculator"
                      className="hover:text-blue-400"
                    >
                      Runway Calculator
                    </Link>
                    <Link
                      href="/resources/roi-calculator"
                      className="hover:text-blue-400"
                    >
                      Investor ROI Calculator
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
          {!session && (
            <div className="flex items-center space-x-3 ml-4">
              <Link
                href="/login"
                className="px-5 py-1.5 border border-gray-600 rounded-md hover:bg-gray-800 transition-colors"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="px-5 py-1.5 border border-gray-600 rounded-md bg-gray-800 hover:bg-gray-700 transition-colors"
              >
                Sign up
              </Link>
            </div>
          )}

          {session && (
            <div className="flex items-center space-x-3 ml-4">
              <Link
                href="/dashboard"
                className="px-5 py-1.5 border border-gray-600 rounded-md hover:bg-gray-800 transition-colors"
              >
                Dashboard
              </Link>
              <button
                onClick={() => signOut()}
                className="px-4 py-2 text-center border border-gray-600 rounded-md bg-gray-800 hover:bg-gray-700 transition-colors"
              >
                Sign out
              </button>
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#1F2937] py-4 px-4">
          <div className="flex flex-col space-y-4">
            <Link
              href="/startups"
              className="hover:text-blue-400 transition-colors"
            >
              For Startups
            </Link>
            <Link
              href="/investors"
              className="hover:text-blue-400 transition-colors"
            >
              For Investors
            </Link>
            <Link
              href="/how-it-works"
              className="hover:text-blue-400 transition-colors"
            >
              How It Works
            </Link>

            {/* Mobile Resources Dropdown */}
            <div>
              <button
                className="flex items-center hover:text-blue-400 transition-colors"
                onClick={() => setIsResourcesOpen(!isResourcesOpen)}
              >
                Resources
                <ChevronDown
                  className={`ml-1 h-4 w-4 transition-transform ${
                    isResourcesOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isResourcesOpen && (
                <div className="mt-2 ml-4 space-y-4">
                  <div>
                    <h3 className="text-sm font-semibold mt-2 mb-1 text-blue-400">
                      Resources
                    </h3>
                    <ul className="space-y-2 text-sm ml-2">
                      <li>
                        <Link
                          href="/resources/accelerator-hunt"
                          className="hover:text-blue-400"
                        >
                          Accelerator Hunt
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/resources/pitch-deck-database"
                          className="hover:text-blue-400"
                        >
                          Pitch Deck Database
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/resources/investor-database"
                          className="hover:text-blue-400"
                        >
                          Investor Database
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/resources/vc-search"
                          className="hover:text-blue-400"
                        >
                          VC Search
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/resources/fundraising-templates"
                          className="hover:text-blue-400"
                        >
                          Fundraising Templates
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/resources/publication"
                          className="hover:text-blue-400"
                        >
                          Publication
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold mt-2 mb-1 text-blue-400">
                      Pricing
                    </h3>
                    <ul className="space-y-2 text-sm ml-2">
                      <li>
                        <Link
                          href="/resources/pitch-perfect"
                          className="hover:text-blue-400"
                        >
                          Pitch Perfect
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/resources/calculators"
                          className="hover:text-blue-400"
                        >
                          Calculators
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/resources/ai-email-generator"
                          className="hover:text-blue-400"
                        >
                          AI Email Generator
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/resources/elevator-pitch-generator"
                          className="hover:text-blue-400"
                        >
                          Elevator Pitch Generator
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/resources/fundraising-glossary"
                          className="hover:text-blue-400"
                        >
                          Fundraising Glossary
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/resources/email-templates"
                          className="hover:text-blue-400"
                        >
                          Email Templates
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold mt-2 mb-1 text-blue-400">
                      Calculators
                    </h3>
                    <ul className="space-y-2 text-sm ml-2">
                      <li>
                        <Link
                          href="/resources/valuation-calculator"
                          className="hover:text-blue-400"
                        >
                          Valuation Calculator
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/resources/burn-rate-calculator"
                          className="hover:text-blue-400"
                        >
                          Burn Rate Calculator
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/resources/runway-calculator"
                          className="hover:text-blue-400"
                        >
                          Runway Calculator
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/resources/roi-calculator"
                          className="hover:text-blue-400"
                        >
                          Investor ROI Calculator
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {!session && (
              <div className="grid grid-cols-2 gap-2 pt-2">
                <Link
                  href="/login"
                  className="px-4 py-2 text-center border border-gray-600 rounded-md hover:bg-gray-800 transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2 text-center border border-gray-600 rounded-md bg-gray-800 hover:bg-gray-700 transition-colors"
                >
                  Sign up
                </Link>
              </div>
            )}
            {session && (
              <div className="grid grid-cols-2 gap-2 pt-2">
                <Link
                  href="/dashboard"
                  className="px-4 py-2 text-center border border-gray-600 rounded-md hover:bg-gray-800 transition-colors"
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => signOut()}
                  className="px-4 py-2 text-center border border-gray-600 rounded-md bg-gray-800 hover:bg-gray-700 transition-colors"
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
