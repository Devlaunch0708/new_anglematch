import { Card, CardContent, CardHeader } from "./ui/card";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Founder, TechStart",
    content:
      "DevLaunch helped us secure our seed round in half the time it took for our previous startup. The quality of investors was exceptional.",
    avatar: "👩‍💼",
  },
  {
    name: "Michael Chen",
    role: "Founder, GreenAI",
    content:
      "I was skeptical at first, but the matches were spot-on. We closed our round with an investor who perfectly understood our space.",
    avatar: "👨‍💻",
  },
  {
    name: "David Rodriguez",
    role: "DevLauch Investor",
    content:
      "As an investor, I appreciate how DevLauch surfaces high-quality deals that match my thesis. It saves me countless hours of filtering.",
    avatar: "👨‍💼",
  },
];

export function Testimonials() {
  return (
    <section className="py-16 bg-white dark:bg-black">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-[#111827] dark:text-white">
            <span className="text-blue-500">Trusted</span> by Founders &
            Investors
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-lg shadow hover:shadow-md transition-all duration-300"
            >
              <CardHeader className="pb-3 border-b border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center text-3xl bg-blue-50 dark:bg-blue-900/30 h-12 w-12 rounded-full">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#111827] dark:text-white">
                      {testimonial.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-gray-700 dark:text-gray-300">
                  "{testimonial.content}"
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
