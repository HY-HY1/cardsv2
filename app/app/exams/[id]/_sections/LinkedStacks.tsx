import ChildCard from "@/app/app/cards/[subject]/_components/ChildCard";
import { Button } from "@/components/ui/button";
import { Stack, Exam } from "@/types/ResponseTypes";
import Link from "next/link";
import React from "react";

interface LinkedStackProps {
  stacks: Stack[];
  exam?: Exam | null;
}

const LinkedStacks = ({ stacks, exam }: LinkedStackProps) => {
  console.log("exam:", exam);

  return (
    <div>
      <header className="pt-10 border-b flex flex-row">
        <div className="w-full flex justify-start flex-col">
          <h2>Linked Stacks</h2>
          <p>Find all the stacks for this exam here.</p>
        </div>
        <div className="w-full flex justify-end">
          {exam?.uuid && (
            <Link href={`/app/cards/revise/${exam.uuid}?type=exam`}>
              <Button>Revise</Button>
            </Link>
          )}
        </div>
      </header>
      <ul className="py-6 w-full grid grid-cols-3 gap-4">
        {stacks.map((stack: Stack, index: number) => (
          <ChildCard key={stack.uuid || index} stack={stack} />
        ))}
      </ul>
    </div>
  );
};

export default LinkedStacks;
