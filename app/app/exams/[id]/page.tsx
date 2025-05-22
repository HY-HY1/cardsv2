"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useExams } from "@/context/ExamContext";
import { ExamBase } from "@/types/RequestTypes";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ExamEditSheet } from "../_components/ExamEditSheet";
import LinkedStacks from "./_sections/LinkedStacks";

const Page: React.FC = () => {
  const params = useParams();
  const id = typeof params.id === "string" ? params.id : "";
  const [exam, setExam] = useState<ExamBase | null>(null);
  const { fetchExamById, deleteExam } = useExams();

  useEffect(() => {
    const fetchResponse = async () => {
      if (!id) return;

      const examData = await fetchExamById(id);
      if (examData) {
        setExam(examData);
        console.log(`Fetched Exam: ${examData.uuid}`);
      }
    };

    fetchResponse();
  }, [id, ]);

  const handleEditSuccess = (updatedExam: ExamBase) => {
    setExam(updatedExam);
    console.log("Exam updated:", updatedExam);
  };

  if (!exam) {
    return <div>Loading exam...</div>;
  }

  return (
    <div>
      <header className="p-4 w-full border-b flex flex-row">
      <h1 className="w-full flex justify-start">{exam.examSubject}</h1>
      <div className="w-full flex justify-end">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant={"outline"}>Edit {exam.examSubject}</Button>
          </SheetTrigger>
          <ExamEditSheet
            examId={exam.uuid}
            onEditSuccess={(updatedExam) => {
              setExam(updatedExam); // update the exam state in parent
              // maybe close the sheet here if you want
            }}
          />
        </Sheet>
        <span className="px-1"></span>
        <Button
          variant={"destructive"}
          onClick={() => deleteExam(exam.uuid)}
          className="py-4 max-w-[120px] w-full"
          type="submit"
        >
          Delete
        </Button>
      </div>
    </header>
    <main>
      <LinkedStacks exam={exam}/>
    </main>
    </div>
  );
};

export default Page;
