import { NextRequest, NextResponse } from "next/server";
import { Subject } from "@/models/Subject";
import { Stack } from "@/models/Stack";
import { Card } from "@/models/Card";
import { v4 as uuidv4 } from "uuid";
import { mongooseConnect } from "@/lib/Mongoose";

// GET: Get all stacks for a subject
export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    await mongooseConnect();

    const stacks = await Stack.find({ subjectId: id });

    if (!stacks || stacks.length === 0) {
      return NextResponse.json({ error: "No stacks were found" }, { status: 404 });
    }

    return NextResponse.json({ stacks }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// POST: Create a new stack under a subject
export async function POST(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const { name, description } = await req.json();

    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    await mongooseConnect();

    const subjectDoc = await Subject.findOne({ uuid: id });
    if (!subjectDoc) {
      return NextResponse.json({ error: "Subject not found" }, { status: 404 });
    }

    const existingStack = await Stack.findOne({ subjectId: id, name });
    if (existingStack) {
      return NextResponse.json({ error: "Stack name already exists under this subject" }, { status: 400 });
    }

    const newStack = new Stack({
      uuid: uuidv4(),
      subjectId: id,
      name,
      description,
      cardIds: [],
    });

    await newStack.save();

    subjectDoc.stackIds.push(newStack.uuid);
    await subjectDoc.save();

    return NextResponse.json({ message: "Stack created successfully", stack: newStack }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
export async function PUT(req: Request, { params }: { params: { id: string } }) {
    try {
      const { id } = params; // Stack UUID
      const { name, description } = await req.json();
  
      if (!name && !description) {
        return NextResponse.json({ error: "Nothing to update" }, { status: 400 });
      }
  
      await mongooseConnect();
  
      const updatedStack = await Stack.findOneAndUpdate(
        { uuid: id },
        {
          ...(name && { name }),
          ...(description && { description }),
        },
        { new: true }
      );
  
      if (!updatedStack) {
        return NextResponse.json({ error: "Stack not found" }, { status: 404 });
      }
  
      return NextResponse.json({ message: "Stack updated successfully", stack: updatedStack }, { status: 200 });
  
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
  }
  

// DELETE: Delete stack, its cards, and its reference in subject
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    await mongooseConnect();

    const stack = await Stack.findOne({ uuid: id });
    if (!stack) {
      return NextResponse.json({ error: "Couldn't find stack to delete" }, { status: 404 });
    }

    // 1. Delete all cards linked to this stack
    await Card.deleteMany({ stackId: stack.uuid });

    // 2. Remove stack UUID from subject
    await Subject.updateOne(
      { uuid: stack.subjectId },
      { $pull: { stackIds: stack.uuid } }
    );

    // 3. Delete the stack
    await Stack.deleteOne({ uuid: id });

    return NextResponse.json({ message: "Stack and related data deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
