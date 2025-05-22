import { mongooseConnect } from "@/lib/Mongoose";
import Exam from "@/models/Exam";
import { Stack } from "@/models/Stack";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await mongooseConnect();
    const { id } = params;

    const exam = await Exam.findOne({ uuid: id });

    if (!exam) {
      return NextResponse.json({ error: "Exam not found" }, { status: 404 });
    }

    // Fetch linked stacks based on exam.Stacks (array of stack UUIDs)
    const linkedStacks = await Stack.find({
      uuid: { $in: exam.Stacks },
    });

    return NextResponse.json(
      { exam, linkedStacks },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET /api/exams/[id] error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}


export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await mongooseConnect();
    const { id } = params;
    const updateData = await req.json();

    console.log("Raw Update Data:", updateData);

    if (updateData.uuid) delete updateData.uuid;

    // Map linkedStacksIds to Stacks
    if (updateData.linkedStacksIds) {
      updateData.Stacks = updateData.linkedStacksIds;
      delete updateData.linkedStacks;
      delete updateData.linkedStacksIds;
    }

    console.log("Transformed Update Data:", updateData);

    const updatedExam = await Exam.findOneAndUpdate(
      { uuid: id },
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedExam) {
      return NextResponse.json({ error: "Exam not found" }, { status: 404 });
    }

    const linkedStacks = await Stack.find({
      uuid: { $in: updatedExam.Stacks },
    });

    return NextResponse.json(
      { exam: updatedExam, linkedStacks },
      { status: 200 }
    );
  } catch (error) {
    console.error("PUT /api/exams/[id] error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}


export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
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
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
