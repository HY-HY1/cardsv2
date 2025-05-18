import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import React from 'react'

const ExamCalendar = () => {
  return (
    <div>
      <header className="border-b py-2 flex flex-row items-center">
        <div className="w-full flex flex-col justify-start">
          <h1>Exam Calendar</h1>
          <p>Upcoming Exams here</p>
        </div>
        {/* <div className="w-full flex justify-end  items-center">
          <Button className="align-middle" variant={"outline"}>
            <span>
              <Plus size={16} />
            </span>
            Add New
          </Button>
        </div> */}
      </header>
    </div>
  )
}

export default ExamCalendar
