"use client";
import * as React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Menu, Plus } from "lucide-react";
import { SheetTrigger } from "@/components/ui/sheet";
import { ExamEditSheet } from "./ExamEditSheet";

import { Sheet } from "@/components/ui/sheet";
import Link from "next/link";

interface ExamCardProps {
  examBoard: string;
  examSubject: string;
  examComponent: string;
  examDate: Date;
  examId: string;
}

export function ExamCard({
  examBoard,
  examComponent,
  examDate,
  examSubject,
  examId,
  ...props
}: ExamCardProps) {
  return (
    <Sheet>
      <Card className="w-full min-w-[100px] hover:bg-gray-50 transition-all cursor-pointer">
        <CardHeader>
          <CardTitle className="border-b flex flex-row items-center">
            <h4 className="w-full">{examSubject}</h4>
            <div className="max-w-[100px] flex justify-end">
              <SheetTrigger asChild>
                <Button className="align-middle" variant="outline">
                  <Menu size={16} />
                  Edit
                </Button>
              </SheetTrigger>
            </div>
          </CardTitle>
        </CardHeader>
        <Link href={`/app/exams/${examId}`}>
          <CardContent className="space-y-2">
            <div>
              <strong>Exam Board:</strong> {examBoard}
            </div>

            <div>
              <strong>Component:</strong> {examComponent}
            </div>

            <div>
              <strong>Date:</strong> {examDate.toLocaleDateString()}
            </div>
          </CardContent>
        </Link>

        <CardFooter>{/* Optional actions here */}</CardFooter>
      </Card>

      <ExamEditSheet examId={examId} />
    </Sheet>
  );
}
