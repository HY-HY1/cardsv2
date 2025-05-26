dsimport { mongooseConnect } from "@/lib/Mongoose";
import Exam from "@/models/Exam";
import { NextResponse } from "next/server";

export async function PUT(req: Request, { params }: { params: { id: string, stackId: string } }) {
  try {
    await mongooseConnect();
    const { id, stackId } = params;

    console.log("exam:", id, "Stack", stackId)
    

    const exam = await Exam.findOne({ uuid: id });
    if (!exam) {
      return NextResponse.json({ error: "Exam not found" }, { status: 404 });
    }

    if (!exam.Stacks.includes(stackId)) {
      exam.Stacks.push(stackId);
      await exam.save();
    }

    return NextResponse.json({ message: "Stack linked", exam }, { status: 200 });
  } catch (error) {
    console.error("Error linking stack:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string, stackId: string } }) {
  try {
    await mongooseConnect();
    const { id, stackId } = params;

    const exam = await Exam.findOne({ uuid: id });
    if (!exam) {
      return NextResponse.json({ error: "Exam not found" }, { status: 404 });
    }

    exam.Stacks = exam.Stacks.filter((id: string) => id !== stackId);
    await exam.save();

    return NextResponse.json({ message: "Stack unlinked", exam }, { status: 200 });
  } catch (error) {
    console.error("Error unlinking stack:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
