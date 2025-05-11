"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function PitchForm({ userId }: { userId: string }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deck, setDeck] = useState<File | null>(null);
  const [solutionUrl, setSolutionUrl] = useState("");
  const [marketSize, setMarketSize] = useState("");
  const [traction, setTraction] = useState("");

  const handleDeckChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setDeck(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let deckUrl = "";
      if (deck) {
        const { data, error } = await supabase.storage
          .from("pitch-files")
          .upload(`${userId}/${deck.name}`, deck);
        if (error) throw error;
        deckUrl = data.path;
      }
      const response = await fetch("/api/pitches", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          title,
          description,
          deckUrl,
          solutionUrl,
          marketSize,
          traction,
        }),
      });
    } catch (error: any) {
      console.error("Error creating pitch:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto sm:p-6 bg-white rounded-lg ">
      <h2 className="text-2xl font-bold mb-6 text-center">Create Your Pitch</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-gray-50 p-4 rounded-lg space-y-4">
          <h3 className="text-xl font-semibold mb-2">Basic Information</h3>
          <div>
            <Label htmlFor="title" className="text-lg font-large">
              Pitch Title
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="mt-1"
              placeholder="Enter your pitch title"
            />
          </div>
          <div>
            <Label htmlFor="description" className="text-lg font-medium">
              Description
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="mt-1 h-32"
              placeholder="Describe your pitch in detail"
            />
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg space-y-4">
          <h3 className="text-font-semibold mb-2">Documentation</h3>
          <div>
            <Label htmlFor="deck" className="text-lg font-medium">
              Pitch Deck (PDF)
            </Label>
            <Input
              id="deck"
              type="file"
              accept=".pdf"
              onChange={handleDeckChange}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="solutionUrl" className="text-lg font-medium">
              Solution Link
            </Label>
            <Input
              id="solutionUrl"
              type="url"
              value={solutionUrl}
              onChange={(e) => setSolutionUrl(e.target.value)}
              className="mt-1"
              placeholder="https://..."
            />
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg space-y-4">
          <h3 className="text-font-semibold mb-2">Market Information</h3>
          <div>
            <Label htmlFor="marketSize" className="text-lg font-medium">
              Market Size
            </Label>
            <Input
              id="marketSize"
              value={marketSize}
              onChange={(e) => setMarketSize(e.target.value)}
              className="mt-1"
              placeholder="Enter market size"
            />
          </div>
          <div>
            <Label htmlFor="traction" className="text-lg font-medium">
              Traction
            </Label>
            <Input
              id="traction"
              value={traction}
              onChange={(e) => setTraction(e.target.value)}
              className="mt-1"
              placeholder="Describe your current traction"
            />
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <Button
            type="submit"
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
          >
            Save Draft
          </Button>
        </div>
      </form>
    </div>
  );
}
