"use client"
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import React from "react";
import AllExams from "./_sections/AllExams";
import ExamCalendar from "./_sections/ExamCalendar";

const page = () => {
  return (
    <div className="w-[70vw] m-auto">
      <AllExams/>
      <ExamCalendar/>
    </div>
  );
};

export default page;
