'use client';

import React, { useMemo, useEffect } from 'react';
import { useCardsContext } from '@/context/CardContext';
import { useStacksContext } from '@/context/StackContext';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { CreateParent } from '@/components/dialogs/createParent';
import { useParams } from 'next/navigation';
import Link from 'next/link';

const Page = () => {
  const { stack, subject } = useParams();
  const { cards } = useCardsContext();
  const { stacks, getStacks, getStackById } = useStacksContext();

  useEffect(() => {
    if (subject) {
      getStacks(subject as string);
    }
  }, [subject, getStacks]);

  const currentStack = useMemo(() => {
    return getStackById(stack as string);
  }, [getStackById, stack]);

  const cardsForStack = useMemo(() => {
    if (!currentStack) return [];
    return cards.filter((card) => card.stackId === currentStack.uuid);
  }, [cards, currentStack]);

  if (!currentStack) {
    return <div className="p-4">Stack not found</div>;
  }
  

  return (
    <div className="p-4 space-y-8">
      <div className="border p-4 rounded-lg shadow-sm">
        <div className="flex justify-start  border-b pb-3 mb-3">
          <Link href={`/app/cards/${subject}/${stack}/create`}>
          <Button variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Add Card
              </Button>
          </Link>
        </div>

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
    </div>
  );
};

export default Page;
