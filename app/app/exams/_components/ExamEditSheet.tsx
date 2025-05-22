import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ExamForm } from "./ExamEditForm";
import { useParams } from "next/navigation";

interface ExamEditSheetProps {
  examId?: string;
  onEditSuccess?: (updatedExam: ExamBase) => void;  // Add this callback prop
}

import { useExams } from "@/context/ExamContext";
import { ExamBase } from "@/types/RequestTypes";

export function ExamEditSheet({ examId, onEditSuccess }: ExamEditSheetProps) {
  const { deleteExam } = useExams();
  return (
    <SheetContent className="min-w-[25vw]">
      <SheetHeader>
        <SheetTitle>Exam</SheetTitle>
        <SheetDescription>
          Create and make changes to your exams
        </SheetDescription>
      </SheetHeader>
      <div className="max-h-[70vh] overflow-y-scroll p-4">
      <ExamForm examId={examId} onEditSuccess={onEditSuccess} />
      </div>
      <SheetFooter>
        <SheetClose asChild>
          <div className="w-full flex flex-col ">
            <span className="py-2 w-full">
              {examId ? (
                <Button
                  variant={"destructive"}
                  onClick={() => deleteExam(examId)}
                  className="py-4 w-full"
                  type="submit"
                >
                  Delete
                </Button>
              ) : (
                <></>
              )}
            </span>
            <Button variant={"outline"} type="submit">
              Close
            </Button>
          </div>
        </SheetClose>
      </SheetFooter>
    </SheetContent>
  );
}
