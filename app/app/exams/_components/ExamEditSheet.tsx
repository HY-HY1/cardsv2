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

export function ExamEditSheet({ examId}: ExamEditSheetProps) {
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
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
  )
}
