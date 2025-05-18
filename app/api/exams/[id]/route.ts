import { mongooseConnect } from "@/lib/Mongoose";
import Exam from "@/models/Exam";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    await mongooseConnect();
    const { id } = params;

    const exam = await Exam.findOne({ uuid: id });

    if (!exam) {
      return NextResponse.json({ error: "Exam not found" }, { status: 404 });
    }

    return NextResponse.json({ exam }, { status: 200 });
  } catch (error) {
    console.error("GET /api/exams/[id] error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    await mongooseConnect();
    const { id } = params;
    const updateData = await req.json();

    if (updateData.uuid) delete updateData.uuid; // prevent changing uuid

    const updatedExam = await Exam.findOneAndUpdate(
      { uuid: id },
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedExam) {
      return NextResponse.json({ error: "Exam not found" }, { status: 404 });
    }

    return NextResponse.json({ exam: updatedExam }, { status: 200 });
  } catch (error) {
    console.error("PUT /api/exams/[id] error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    await mongooseConnect();
    const { id } = params;

    const deletedExam = await Exam.findOneAndDelete({ uuid: id });

    if (!deletedExam) {
      return NextResponse.json({ error: "Exam not found" }, { status: 404 });
    }

    return NextResponse.json({ deleted: deletedExam }, { status: 200 });
  } catch (error) {
    console.error("DELETE /api/exams/[id] error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
