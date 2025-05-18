import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { ExamForm } from "./ExamEditForm"

interface ExamEditSheetProps {
    examId?: string
}

import { useExams } from "@/context/ExamContext"

export function ExamEditSheet({ examId}: ExamEditSheetProps) {
  const { deleteExam } = useExams()
  return (

      <SheetContent className="min-w-[25vw]">
        <SheetHeader>
          <SheetTitle>Exam</SheetTitle>
          <SheetDescription>
            Create and make changes to your exams
          </SheetDescription>
        </SheetHeader>
            <div className="p-4">

            <ExamForm examId={examId}/>
            </div>
        <SheetFooter>
          <SheetClose asChild>
            <div className="w-full flex flex-col ">
            <span className="py-2 w-full">{ examId ? <Button variant={"destructive"} onClick={() => deleteExam(examId)} className="py-4 w-full" type="submit">Delete</Button> : <></>}</span>
            <Button variant={"outline"} type="submit">Close</Button>
            </div>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
  )
}
