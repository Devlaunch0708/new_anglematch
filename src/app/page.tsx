import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Features } from "@/components/features";
import { Testimonials } from "@/components/testimonials";
import { CTA } from "@/components/cta";

import FindInvestor from "@/components/findInvestor";

import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Features />
        <FindInvestor />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
