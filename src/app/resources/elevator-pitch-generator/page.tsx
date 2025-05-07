"use client";
import { useState } from "react";

export default function ElevatorPitchGenerator() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const generatePitch = () => {
    // In a real app, this would call an API
    setOutput(`We're ${input}, a [type of company] that helps [target audience] [solve problem] by [solution]. 
    
Unlike [competitors], we [differentiator]. We're seeking [investment amount] to [use of funds].`);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Elevator Pitch Generator</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Describe your startup in one sentence
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full p-2 border rounded h-20"
            placeholder="E.g., We're building an AI tool that helps e-commerce stores..."
          />
        </div>
        <button
          onClick={generatePitch}
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Generate Pitch
        </button>
        {output && (
          <div className="mt-6">
            <label className="block text-sm font-medium mb-1">
              Your Elevator Pitch
            </label>
            <div className="p-4 bg-gray-50 rounded whitespace-pre-line">
              {output}
            </div>
            <div className="flex gap-2 mt-3">
              <button className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
                Save
              </button>
              <button className="text-sm text-blue-600 hover:underline">
                Copy to Clipboard
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
