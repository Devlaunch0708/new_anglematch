import { Button } from "./ui/button";

export function CTA() {
  return (
    <section className="py-20 bg-white dark:bg-[#111827]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center bg-white dark:bg-[#1F2937] shadow-lg rounded-2xl p-10 border border-gray-100 dark:border-gray-800">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-[#111827] dark:text-white">
            Ready to find your{" "}
            <span className="text-blue-500">perfect investor match</span>?
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-300 text-lg">
            Join hundreds of founders who've successfully raised through
            DevLauch.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <Button className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-8 py-6 text-lg rounded-lg">
              Get Started Free
            </Button>
            <Button
              variant="outline"
              className="border-blue-500 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 px-8 py-6 text-lg rounded-lg"
            >
              Book a Demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
