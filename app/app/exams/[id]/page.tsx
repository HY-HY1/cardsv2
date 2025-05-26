"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useExams } from "@/context/ExamContext";
import { useSubjectsContext } from "@/context/SubjectContext";
import { Exam, Stack } from "@/types/ResponseTypes";
import LinkedStacks from "./_sections/LinkedStacks";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ExamEditSheet } from "../_components/ExamEditSheet";
import { AlertDialog } from "@/components/ui/alert-dialog";
import { AlertDialogTrigger } from "@radix-ui/react-alert-dialog";
import { DeleteAlert } from "@/components/dialogs/deleteAlert";

export interface fetchExamByIdResponse {
  exam: Exam;
  linkedStacks: Stack[];
}

const page = () => {
  const { id } = useParams();
  const { fetchExamById, deleteExam } = useExams();
  const [exam, setExam] = useState<Exam | null>(null);
  const [linkedStacks, setLinkedStacks] = useState<Stack[] | null>(null);

  useEffect(() => {
    if (!id || typeof id !== "string") return;

    const fetchAll = async () => {
      const response = await fetchExamById(id);
      console.log("Fetch Exam By ID Response", response);
      if (response?.exam) {
        setExam(response.exam);
      }
      if (response?.linkedStacks) {
        console.log("Linked Stacks Response", response.linkedStacks[0]?.name);
        setLinkedStacks(response.linkedStacks);
      }
    };

    fetchAll();
  }, [id]);

  return (
    <div>
      <header className="w-full border-b flex flex-row">
        <div className="w-full flex justify-start flex-col">
          <h1>{exam?.examSubject}</h1>
          <p className="opacity-70">{exam?.examComponent}</p>
        </div>
        <div className="w-full flex justify-end align-middle content-center py-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant={"outline"}>Edit {exam?.examSubject}</Button>
            </SheetTrigger>
            {typeof id === "string" ? <ExamEditSheet examId={id} /> : null}
          </Sheet>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant={"destructive"}> Delete </Button>
            </AlertDialogTrigger>
            {exam?.uuid && (
              <DeleteAlert
                id={exam.uuid}
                onClickFunction={(id) => deleteExam(id)}
              />
            )}
          </AlertDialog>
        </div>
      </header>
      <main>
        <div>{linkedStacks && <LinkedStacks exam={exam} stacks={linkedStacks} />}</div>
      </main>
    </div>
  );
};

export default page;
