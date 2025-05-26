"use client";

import React, { useMemo, useEffect } from "react";
import { useCardsContext } from "@/context/CardContext";
import { useStacksContext } from "@/context/StackContext";
import { Button } from "@/components/ui/button";
import { Book, Plus, Trash } from "lucide-react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { CreateParent } from "@/components/dialogs/createParent";
import { useParams } from "next/navigation";
import Link from "next/link";
import { AlertDialog, AlertDialogTrigger } from "@radix-ui/react-alert-dialog";
import { DeleteAlert } from "@/components/dialogs/deleteAlert";

const Page = () => {
  const { stack, subject } = useParams();
  const { cards, getCards, deleteCard } = useCardsContext();
  const { stacks, getStacks, getStackById } = useStacksContext();

  useEffect(() => {
    if (subject) {
      getStacks(subject as string);
      getCards(stack as string);
    }
  }, [subject, getStacks]);

  const currentStack = useMemo(() => {
    return getStackById(stack as string);
  }, [getStackById, stack]);

  const cardsForStack = useMemo(() => {
    if (!currentStack) return [];
    const filteredCards = cards.filter(
      (card) => card.stackId === currentStack.uuid
    );
    console.log("Cards", cards);
    console.log("Filtered Cards: ", filteredCards);
    return filteredCards;
  }, [cards, currentStack]);

  if (!currentStack) {
    return <div className="p-4">Stack not found</div>;
  }

  return (
    <div className="p-4 space-y-8">
      <div className=" ">
        <div className="w-full flex flex-row">
          <div className="flex justify-start  border-b pb-3 mb-3">
            <Link href={`/app/cards/${subject}/${stack}/create`}>
              <Button variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Manage Cards
              </Button>
            </Link>
          </div>
          <div className="flex   border-b pb-3 mb-3 w-full justify-end">
            <Link href={`/app/cards/revise/${currentStack.uuid}?type=stack`}>
              <Button variant="outline">
                <Book className="w-4 h-4 mr-2" />
                Revise Cards
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {cardsForStack.length === 0 ? (
            <p>No cards in this stack yet.</p>
          ) : (
            cardsForStack.map((card) => (
              <div
                key={card.uuid}
                className="mb-2 p-4 border rounded-md hover:bg-gray-50 transition-all w-full"
              >
                <div className="w-full flex flex-row">
                  <div className="w-full flex-col flex justify-start">
                    <p>
                      <strong>Q:</strong> {card.question}
                    </p>
                    <p>
                      <strong>A:</strong> {card.answer}
                    </p>
                  </div>
                  <div className="w-full flex justify-end mt-3">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant={"outline"}>
                          <Trash size={16} />
                        </Button>
                      </AlertDialogTrigger>
                      <DeleteAlert
                        onClickFunction={() => deleteCard(card.uuid)}
                        id={card.uuid}
                      />
                    </AlertDialog>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
