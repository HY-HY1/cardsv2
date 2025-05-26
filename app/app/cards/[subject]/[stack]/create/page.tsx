// app/[subject]/[stack]/create/page.tsx
"use client";

import React from "react";
import FlashCardPreview from "../../_components/CreateFlashcard";
import { useCardsContext } from "@/context/CardContext";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";

const Page = () => {
  const { cards } = useCardsContext();
  const { stack } = useParams<{ stack: string }>();

  return (
    <div className="w-[78%] m-auto space-y-6">
      {/* Existing cards for editing */}
      {cards.map((c) => (
        <FlashCardPreview key={c.uuid} card={c} stackId={stack} />
      ))}

      {/* New card creation */}
      <FlashCardPreview stackId={stack} />
      <div className="w-full flex justify-end">
        <Button variant={`outline`}>
          Save & Start Revising
        </Button>
      </div>
    </div>
  );
};

export default Page;
