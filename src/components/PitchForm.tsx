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
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">Pitch Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="deck">Pitch Deck (PDF)</Label>
        <Input
          id="deck"
          type="file"
          accept=".pdf"
          onChange={handleDeckChange}
        />
      </div>
      <div>
        <Label htmlFor="solutionUrl">Solution Link</Label>
        <Input
          id="solutionUrl"
          type="url"
          value={solutionUrl}
          onChange={(e) => setSolutionUrl(e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="marketSize">Market Size</Label>
        <Input
          id="marketSize"
          value={marketSize}
          onChange={(e) => setMarketSize(e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="traction">Traction</Label>
        <Input
          id="traction"
          value={traction}
          onChange={(e) => setTraction(e.target.value)}
        />
      </div>
      <Button type="submit">Save Draft</Button>
    </form>
  );
}
