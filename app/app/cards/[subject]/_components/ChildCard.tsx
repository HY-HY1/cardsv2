import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Stack } from "@/types/ResponseTypes";
import Link from "next/link";

// Accept the prop as `data: { stack: Stack }` or destructure it as `{ name, description }`
interface ChildCardProps {
  stack: Stack;
}

import { useParams } from "next/navigation";

const ChildCard: React.FC<ChildCardProps> = ({ stack }) => {
  const { subject } = useParams();
  return (
    <Card className="w-full hover:bg-gray-50 transition-all min-w-[150px] min-h-[200px]">
      <CardHeader>
        <CardTitle>{stack.name}</CardTitle>
        <CardDescription>{stack.description}</CardDescription>
      </CardHeader>
      <CardContent>
        
      </CardContent>
      <Link href={`/app/cards/${subject}/${stack.uuid}`}>
        <CardFooter className="flex justify-between w-full">
          <Button className="w-full">Enter</Button>
        </CardFooter>
      </Link>
    </Card>
  );
};

export default ChildCard;
