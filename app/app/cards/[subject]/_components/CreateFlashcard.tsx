"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lightbulb, ImagePlus } from "lucide-react";
import { useCardsContext } from "@/context/CardContext";
import { Card } from "@/types/ResponseTypes";
import ImageUpload from "./ImageUpload";
import axios from "axios";

interface FlashCardPreviewProps {
  card?: Card;
  stackId: string;
}

const FlashCardPreview = ({ card, stackId }: FlashCardPreviewProps) => {
  const [question, setQuestion] = useState(card?.question || "");
  const [answer, setAnswer] = useState(card?.answer || "");
  const [hint, setHint] = useState(card?.hint || "");
  const [showHint, setShowHint] = useState(!!card?.hint);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [showImageUpload, setShowImageUpload] = useState(false);

  const { createCard, editCard } = useCardsContext();

  useEffect(() => {
    if (!selectedFile) {
      setPreviewUrl(null);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreviewUrl(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [selectedFile]);

  const handleSubmit = async () => {
    if (!question.trim() || !answer.trim()) return;

    let uploadedImageUrl = "";

    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);

      try {
        const uploadResponse = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/upload`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        uploadedImageUrl = uploadResponse.data.filename || "";
      } catch (error) {
        console.error("Image upload failed:", error);
      }
    }

    const payload = {
      question,
      answer,
      hint,
      imageUrl: uploadedImageUrl !== "" ? uploadedImageUrl : undefined,
    };

    const filteredPayload = Object.fromEntries(
      Object.entries(payload).filter(
        ([_, value]) =>
          value !== "" &&
          value !== undefined &&
          !(Array.isArray(value) && value.length === 0)
      )
    ) as {
      question: string;
      answer: string;
      hint?: string;
      imageUrl?: string;
    };

    try {
      if (card?.uuid) {
        await editCard(card.uuid, filteredPayload);
        console.log("Card edited:", card.uuid);
      } else {
        await createCard(stackId, filteredPayload);
        console.log("Card created");
        setQuestion("");
        setAnswer("");
        setHint("");
        setShowHint(false);
        setSelectedFile(null);
        setShowImageUpload(false);
      }
    } catch (error) {
      console.error("Error saving card:", error);
    }
  };

  return (
    <div className="w-full rounded-xl border shadow-sm bg-white mt-6">
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

        <div className="grid grid-cols-1 h-full sm:grid-cols-5 gap-4 items-start">
          {showImageUpload ? (
            <>
              <div className="sm:col-span-4 h-full">
                <Label htmlFor="upload" className="py-2">
                  Add Image
                </Label>
                <ImageUpload
                  onFileSelected={(file: File | null) => setSelectedFile(file)}
                  singleFile={true}
                />
                <div
                  className="mt-2 text-sm text-blue-600 cursor-pointer hover:underline"
                  onClick={() => {
                    setSelectedFile(null);
                    setShowImageUpload(false);
                  }}
                >
                  Remove Image
                </div>
              </div>

              {previewUrl && (
                <div className="sm:col-span-1">
                  <Label className="py-2">Preview</Label>
                  <div className="relative w-full h-auto border rounded-md overflow-hidden">
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="object-cover w-full h-24 rounded"
                    />
                  </div>
                </div>
              )}
            </>
          ) : (
            <div
              className="flex items-center text-sm text-blue-600 cursor-pointer hover:underline"
              onClick={() => setShowImageUpload(true)}
            >
              <ImagePlus className="w-4 h-4 mr-2" />
              Add Image?
            </div>
          )}
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
