// app/_components/CreateFlashcard.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lightbulb } from "lucide-react";
import { useCardsContext } from "@/context/CardContext";
import { Card } from "@/types/ResponseTypes";

interface FlashCardPreviewProps {
  card?: Card;
  stackId: string;
}

const FlashCardPreview = ({ card, stackId }: FlashCardPreviewProps) => {
  const [question, setQuestion] = useState(card?.question || "");
  const [answer, setAnswer] = useState(card?.answer || "");
  const [hint, setHint] = useState(card?.hint || "");
  const [showHint, setShowHint] = useState(!!card?.hint);

  const { createCard, editCard } = useCardsContext();

  const handleSubmit = async () => {
    if (!question.trim() || !answer.trim()) return;

    const payload = { question, answer, hint };

    try {
      if (card?.uuid) {
        await editCard(card.uuid, payload);
        console.log("Card edited:", card.uuid);
      } else {
        await createCard(stackId, payload);
        console.log("Card created");
        // Reset form
        setQuestion("");
        setAnswer("");
        setHint("");
        setShowHint(false);
      }
    } catch (error) {
      console.error("Error saving card:", error);
    }
  };

  return (
    <div className="w-full rounded-xl border shadow-sm bg-white mt-6">
      <div className="p-6 space-y-6">
        <div className="w-full grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="question">Question</Label>
            <Input
              id="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Enter a question"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="answer">Answer</Label>
            <Input
              id="answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Enter an answer"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 w-full">
          {showHint ? (
            <div className="flex-1 space-y-2 w-full">
              <Label htmlFor="hint">Hint</Label>
              <Input
                id="hint"
                value={hint}
                onChange={(e) => setHint(e.target.value)}
                placeholder="Enter a hint"
              />
              <div
                className="flex items-center text-sm text-blue-600 cursor-pointer hover:underline mt-1"
                onClick={() => setShowHint(false)}
              >
                <Lightbulb className="w-4 h-4 mr-2" />
                Remove Hint
              </div>
            </div>
          ) : (
            <div
              className="flex items-center text-sm text-blue-600 cursor-pointer hover:underline"
              onClick={() => setShowHint(true)}
            >
              <Lightbulb className="w-4 h-4 mr-2" />
              Add a Hint
            </div>
          )}

          <Button variant="default" onClick={handleSubmit}>
            {card ? "Update" : "Create"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FlashCardPreview;
