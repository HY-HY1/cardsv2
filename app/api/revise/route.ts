import { NextResponse } from "next/server";
import Exam from "@/models/Exam";
import { Stack } from "@/models/Stack";
import { Card } from "@/models/Card";
import { mongooseConnect } from "@/lib/Mongoose";

export async function POST(req: Request) {
  try {
    await mongooseConnect();

    const { uuid, type } = await req.json();

    if (!uuid || !type) {
      return NextResponse.json(
        { error: "Missing required fields: uuid and type" },
        { status: 400 }
      );
    }

    if (type === "subject") {
      const stacks = await Stack.find({ subjectId: uuid });
      const stackUuids = stacks.map((stack) => stack.uuid);
      const cards = await Card.find({ stackId: { $in: stackUuids } });

      // Return empty arrays if none found
      return NextResponse.json({ stacks, cards }, { status: 200 });
    }

    if (type === "stack") {
      const cards = await Card.find({ stackId: uuid });
      const stack = await Stack.findOne({ uuid: uuid })
      // No stacks related to a single stack, return empty array for consistency
      return NextResponse.json({ stacks: stack, cards }, { status: 200 });
    }

    if (type === "exam") {
      const exam = await Exam.findOne({ uuid });

      if (!exam) {
        return NextResponse.json({ error: "Exam not found" }, { status: 404 });
      }

      const stacks = await Stack.find({ uuid: { $in: exam.Stacks } });
      const stackUuids = stacks.map((stack) => stack.uuid);
      const cards = await Card.find({ stackId: { $in: stackUuids } });

      return NextResponse.json({ stacks, cards }, { status: 200 });
    }

    // If type is unknown, return error
    return NextResponse.json({ error: "Invalid type" }, { status: 400 });
  } catch (error) {
    console.error("Server error in /revise route:", error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
