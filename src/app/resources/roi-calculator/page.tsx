"use client";
import { useState } from "react";

export default function InvestorROICalculator() {
  const [investment, setInvestment] = useState("");
  const [valuation, setValuation] = useState("");
  const [exitValuation, setExitValuation] = useState("");
  const [roi, setRoi] = useState<number | null>(null);

  const calculate = () => {
    const investmentValue = parseFloat(investment) || 0;
    const valuationValue = parseFloat(valuation) || 0;
    const exitValuationValue = parseFloat(exitValuation) || 0;

    const ownership = investmentValue / valuationValue;
    const exitValue = ownership * exitValuationValue;
    setRoi(((exitValue - investmentValue) / investmentValue) * 100);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Investor ROI Calculator</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Investment Amount ($)
            </label>
            <input
              type="number"
              value={investment}
              onChange={(e) => setInvestment(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Post-money Valuation ($)
            </label>
            <input
              type="number"
              value={valuation}
              onChange={(e) => setValuation(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Potential Exit Valuation ($)
            </label>
            <input
              type="number"
              value={exitValuation}
              onChange={(e) => setExitValuation(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
        <button
          onClick={calculate}
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Calculate ROI
        </button>
        {roi !== null && (
          <div className="mt-6 p-4 bg-blue-50 rounded">
            <h3 className="font-medium">Projected ROI</h3>
            <p className="text-2xl font-bold mt-1">
              {roi > 0 ? "+" : ""}
              {roi.toFixed(1)}%
            </p>
            <p className="text-sm mt-1">
              Potential return: $
              {(
                (parseFloat(investment) || 0) *
                (1 + roi / 100)
              ).toLocaleString()}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
