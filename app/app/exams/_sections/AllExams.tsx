import { Button } from "@/components/ui/button";
import { useExams } from "@/context/ExamContext";
import Exam from "@/models/Exam";
import { Plus } from "lucide-react";
import React from "react";
import { ExamCard } from "../_components/ExamCard";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { ExamEditSheet } from "../_components/ExamEditSheet";

const AllExams = () => {
  const { exams } = useExams();
  return (
    <Sheet>
      <div>
        <header className="border-b py-2 flex flex-row items-center">
          <div className="w-full flex flex-col justify-start">
            <h1>Your Exams</h1>
            <p>All of your upcoming exams will be shown here</p>
          </div>
          <div className="w-full flex justify-end  items-center">
            <SheetTrigger asChild>
              <Button className="align-middle" variant={"outline"}>
                <span>
                  <Plus size={16} />
                </span>
                Add New
              </Button>
            </SheetTrigger>
          </div>
        </header>
        <main>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {exams?.map((exam) => (
              <ExamCard
                examId={exam.uuid}
                key={exam.uuid}
                examBoard={exam.examBoard}
                examComponent={exam.examComponent}
                examDate={new Date(exam.ExamDate)}
                examSubject={exam.examSubject}
              />
            ))}
          </div>
        </main>
      </div>
      <ExamEditSheet/>
    </Sheet>
  );
};

export default AllExams;
