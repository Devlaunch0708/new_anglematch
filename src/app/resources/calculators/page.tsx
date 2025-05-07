import Link from "next/link";

const calculatorLinks = [
  { name: "Valuation Calculator", href: "/resources/valuation-calculator" },
  { name: "Burn Rate Calculator", href: "/resources/burn-rate-calculator" },
  { name: "Runway Calculator", href: "/resources/runway-calculator" },
  { name: "Investor ROI Calculator", href: "/resources/roi-calculator" },
];

export default function Calculators() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Startup Calculators</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="mb-6">
          Essential financial tools to help you plan and manage your startup's
          funding.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {calculatorLinks.map((calc) => (
            <Link
              key={calc.name}
              href={calc.href}
              className="border rounded-lg p-4 hover:shadow-md transition-shadow block"
            >
              <h3 className="font-bold">{calc.name}</h3>
              <p className="text-sm text-gray-600 mt-1">Calculate →</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
