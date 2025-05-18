import { NextResponse } from "next/server";
import Exam from "@/models/Exam";
import { v4 as uuidv4 } from "uuid";
import { mongooseConnect } from "@/lib/Mongoose";

export async function GET(req: Request) {
  try {
    await mongooseConnect()
    const exams = await Exam.find();
    if (!exams || exams.length === 0) {
      return NextResponse.json({ error: "No exams found" }, { status: 200 });
    }

    return NextResponse.json({ exams }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { examBoard, examSubject, SubjectId, ExamDate, examComponent, Stacks } = await req.json();

    

    if (!examBoard || !examSubject || !ExamDate || !examComponent || !SubjectId) {
      return NextResponse.json({ error: "Required fields are missing" }, { status: 400 });
    }

    if (Stacks && !Array.isArray(Stacks)) {
      return NextResponse.json({ error: "Stacks must be an array of UUID strings" }, { status: 400 });
    }

    await mongooseConnect()

    const newExam = await Exam.create({
      uuid: uuidv4(),
      examBoard,
      examSubject,
      examComponent,
      SubjectId,
      Stacks, // Should be an array of UUID strings
      ExamDate: new Date(ExamDate), // Ensures date is parsed correctly
    });

    return NextResponse.json({ exam: newExam }, { status: 201 });

  } catch (error) {
    console.error("Error creating exam:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
