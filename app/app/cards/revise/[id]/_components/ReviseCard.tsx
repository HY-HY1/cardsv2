import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import React, { useState } from 'react';

interface ReviseCardProps {
  question: string;
  answer: string;
}

const ReviseCard = ({ question, answer }: ReviseCardProps) => {
  const [showAnswer, setShowAnswer] = useState<boolean>(false);

  return (
    <div className="p-1">
      <Card>
        <CardContent className="flex min-h-[200px] items-center justify-center p-6">
          <div className="w-full text-center space-y-4">
            <p className="text-lg font-semibold">
              {showAnswer ? answer : question}
            </p>
            <Button
              variant="default"
              className="w-full"
              onClick={() => setShowAnswer(!showAnswer)}
            >
              {showAnswer ? 'Show Question' : 'Show Answer'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReviseCard;
