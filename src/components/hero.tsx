import { Button } from "./ui/button";
import { Card } from "./ui/card";
import Image from "next/image";
import heroImg from "../assets/image.png";

export function Hero() {
  return (
    <section className="relative py-20 bg-[#111827] text-white mx-auto px-2 md:px-8 lg:px-16 min-h-[95vh] ">
      <div className="container grid items-center gap-12 px-4 md:px-6 lg:grid-cols-2 lg:gap-12">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            Connect with <span className="block mt-2 lg:mt-4 pb-2"></span>
            thousands of <span className="block"></span>
            <span className="inline-block bg-gradient-to-r from-[#2D5BFF] to-[#73737300] border-l-[3px] border-l-[#0011ff] mt-2 lg:mt-4 pb-2">
              Investors
            </span>{" "}
            <span className=""> in seconds</span>
          </h1>
          <p className="max-w-[600px] text-gray-400 md:text-xl my-8">
            DevLauch connects you with 110,000+ investors and venture
            capitalists in one platform so you save time on the grueling process
            of searching for investors.
          </p>
          <div className="flex flex-col gap-2 min-[400px]:flex-row mt-2 lg:mt-4">
            <Button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 text-base font-medium">
              Find investors
            </Button>
            <Button className="bg-transparent border border-gray-600 hover:bg-gray-800 text-white px-8 py-3 text-base font-medium flex items-center">
              Try for free
              <svg className="ml-2 h-4 w-4" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 12h14M12 5l7 7-7 7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Button>
          </div>
        </div>
        <div className="flex justify-center">
          <Image src={heroImg} alt="hero img " className=" w-full " />
          {/* <Card className="w-full max-w-md overflow-hidden rounded-xl border border-gray-700 bg-gradient-to-br from-purple-900/20 to-black/50 p-1">
            <div className="h-80 w-full rounded-lg bg-gradient-to-br from-purple-900/10 to-black/30 flex items-center justify-center">
            <Image 
              src={heroImg}
              alt="Investor search interface" 
              className="rounded-lg shadow-xl w-full "
            />
            </div>
          </Card> */}
        </div>
      </div>
    </section>
  );
}
