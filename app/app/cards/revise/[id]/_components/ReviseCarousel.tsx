import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getRevisionCards } from "@/types/ResponseTypes";
import ReviseCard from "./ReviseCard";

interface ReviseCarouselProps {
  data: getRevisionCards;
}

export function ReviseCarousel({ data }: ReviseCarouselProps) {
  return (
    <Carousel className="w-full">
      <CarouselContent>
        {data.cards.map((card, index) => (
          <CarouselItem key={card.uuid || index}>
            <ReviseCard question={card.question} answer={card.answer} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
