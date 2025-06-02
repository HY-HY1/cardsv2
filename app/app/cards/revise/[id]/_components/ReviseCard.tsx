import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Lightbulb, Check, X } from "lucide-react";
import React, { useState } from "react";
import { putRevisionAnswer } from "@/hooks/useRevise";

interface ReviseCardProps {
  question: string;
  answer: string;
  uuid: string;
  hint?: string;
  image: string;
}

const ReviseCard = ({ question, answer, hint, uuid, image }: ReviseCardProps) => {
  const [showAnswer, setShowAnswer] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

  return (
    <div className="p-2 w-full max-w-xl mx-auto">
      <Card className="w-full h-full">
        <CardContent
          className="flex flex-col h-full select-none p-4 cursor-pointer"
          onClick={() => setShowAnswer(!showAnswer)}
        >
          {/* Top Row: Hint & Status */}
          <div className="w-full flex justify-between items-center border-b pb-2 mb-4">
            {hint ? (
              showHint ? (
                <p className="text-sm text-muted-foreground max-w-xs">{hint}</p>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowHint(true);
                  }}
                >
                  <Lightbulb size={16} className="mr-2" />
                  Get A Hint
                </Button>
              )
            ) : (
              <p className="text-sm italic text-muted-foreground">No hint available</p>
            )}
            <p className="text-sm text-muted-foreground">
              {showAnswer ? "Answer" : "Question"}
            </p>
          </div>

          {/* Main Content: Image + Q&A */}
          <div className="flex-1 flex flex-col sm:flex-row gap-4 items-center justify-center">
            {image && (
              <div className="w-full sm:w-1/3 flex justify-center">
                <img
                  src={`${baseURL}/api/upload/${image}`}
                  alt="flashcard visual"
                  className="rounded-lg max-h-40 object-contain"
                />
              </div>
            )}

            <div className="w-full sm:w-2/3 text-center">
              <h2 className="text-lg font-medium">{showAnswer ? answer : question}</h2>
            </div>
          </div>

          {/* Bottom Row: Action Buttons */}
          <div
            className="flex justify-center gap-6 mt-6 border-t pt-4"
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              variant="outline"
              onClick={() => {
                putRevisionAnswer({ id: uuid, type: "incorrect" });
                setDisabled(true);
              }}
              disabled={disabled}
              size="icon"
            >
              <X className="text-red-500" />
            </Button>

            <Button
              variant="outline"
              onClick={() => {
                putRevisionAnswer({ id: uuid, type: "correct" });
                setDisabled(true);
              }}
              disabled={disabled}
              size="icon"
            >
              <Check className="text-green-500" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReviseCard;
