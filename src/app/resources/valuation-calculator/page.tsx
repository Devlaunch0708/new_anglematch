"use client";
import { useState } from "react";

export default function ValuationCalculator() {
  const [revenue, setRevenue] = useState("");
  const [multiple, setMultiple] = useState("5");
  const [valuation, setValuation] = useState<number | null>(null);

  const calculate = () => {
    const rev = parseFloat(revenue) || 0;
    const mult = parseFloat(multiple) || 0;
    setValuation(rev * mult);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Valuation Calculator</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">
              Annual Revenue ($)
            </label>
            <input
              type="number"
              value={revenue}
              onChange={(e) => setRevenue(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter your annual revenue"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Industry Multiple
            </label>
            <select
              value={multiple}
              onChange={(e) => setMultiple(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="3">3x (Traditional Business)</option>
              <option value="5">5x (Early Stage Startup)</option>
              <option value="8">8x (Growth Stage)</option>
              <option value="12">12x (High Growth Tech)</option>
            </select>
          </div>
        </div>
        <button
          onClick={calculate}
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Calculate Valuation
        </button>
        {valuation !== null && (
          <div className="mt-6 p-4 bg-blue-50 rounded">
            <h3 className="font-medium">Estimated Valuation</h3>
            <p className="text-2xl font-bold mt-1">
              ${valuation.toLocaleString()}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
