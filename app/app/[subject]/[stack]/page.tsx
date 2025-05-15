"use client";

import React, { useEffect, useState } from "react";
import { useCardsContext } from "@/context/CardContext";
import { useStacksContext } from "@/context/StackContext";
import { Card, Stack } from "@/types/ResponseTypes";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { CreateParent } from "@/components/dialogs/createParent";
import { useParams } from "next/navigation";

const Page = () => {
  const { getStacks, stacks } = useStacksContext();
  const { cards } = useCardsContext();
  const { stack } = useParams();


  return (
    <div className="p-4 space-y-8">
      {stacks.map((stack: Stack) => {
        const cardsForStack = cards.filter(
          (card) => card.stackId === stack.uuid
        );

        return (
          <div key={stack.uuid} className="border p-4 rounded-lg shadow-sm">
            <div className="flex justify-between items-center border-b pb-3 mb-3">
              <div>
                <h2 className="text-xl font-bold">{stack.name}</h2>
                <p className="text-muted-foreground">{stack.description}</p>
              </div>

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Card
                  </Button>
                </DialogTrigger>
                <CreateParent
                  title={`Add Card to ${stack.name}`}
                  description={`Add a new card to the "${stack.name}" stack.`}
                  onClickFunction={({ name, description }) => {
                    // Add card logic here (likely from cards context)
                  }}
                />
              </Dialog>
            </div>

            {/* Render cards for this stack */}
            <div>
              {cardsForStack.length === 0 ? (
                <p>No cards in this stack yet.</p>
              ) : (
                cardsForStack.map((card) => (
                  <div key={card.uuid} className="mb-2 p-2 border rounded">
                    <p>
                      <strong>Q:</strong> {card.question}
                    </p>
                    <p>
                      <strong>A:</strong> {card.answer}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Page;
