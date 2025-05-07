"use client";
import { useState } from "react";

export default function AIEmailGenerator() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const generateEmail = () => {
    // In a real app, this would call an API
    setOutput(`Subject: Exciting Investment Opportunity - ${input}
    
Hi [Investor Name],

I'm reaching out because ${input} is revolutionizing the market with our innovative solution. We're currently raising $[Amount] to [brief purpose].

Would you be available for a quick call next week to discuss this opportunity?

Best regards,
[Your Name]`);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">AI Investor Email Generator</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Describe your startup
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full p-2 border rounded h-32"
            placeholder="E.g., We're building an AI-powered platform for..."
          />
        </div>
        <button
          onClick={generateEmail}
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Generate Email
        </button>
        {output && (
          <div className="mt-6">
            <label className="block text-sm font-medium mb-1">
              Generated Email
            </label>
            <div className="p-4 bg-gray-50 rounded whitespace-pre-line">
              {output}
            </div>
            <button className="mt-2 text-sm text-blue-600 hover:underline">
              Copy to Clipboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
