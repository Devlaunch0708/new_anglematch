"use client";
import { useState } from "react";

export default function BurnRateCalculator() {
  const [cash, setCash] = useState("");
  const [months, setMonths] = useState("");
  const [burnRate, setBurnRate] = useState<number | null>(null);

  const calculate = () => {
    const cashValue = parseFloat(cash) || 0;
    const monthsValue = parseFloat(months) || 0;
    setBurnRate(cashValue / monthsValue);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Burn Rate Calculator</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">
              Cash Balance ($)
            </label>
            <input
              type="number"
              value={cash}
              onChange={(e) => setCash(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Time Period (months)
            </label>
            <input
              type="number"
              value={months}
              onChange={(e) => setMonths(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
        <button
          onClick={calculate}
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Calculate Burn Rate
        </button>
        {burnRate !== null && (
          <div className="mt-6 p-4 bg-blue-50 rounded">
            <h3 className="font-medium">Monthly Burn Rate</h3>
            <p className="text-2xl font-bold mt-1">
              $
              {burnRate.toLocaleString(undefined, { maximumFractionDigits: 2 })}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
