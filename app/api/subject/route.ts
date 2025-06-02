import { NextResponse } from "next/server";
import { Subject } from "@/models/Subject";
import { createDocument } from "@/utils/CrudHandlers";
import { v4 as uuidv4 } from "uuid";
import { mongooseConnect } from "@/lib/Mongoose";

export async function GET() {
  try {
    await mongooseConnect();

    const results = await Subject.find().exec();

    return NextResponse.json(
      { results: results.length > 0 ? results : [] },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching data: ", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { name, description } = await req.json();

    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    const subjectData = {
      name,
      description: description || undefined,
      uuid: uuidv4(),
      stackIds: [],
    };

    const newSubject = await createDocument(Subject, subjectData);

    return NextResponse.json(
      { message: "Subject created successfully", data: newSubject },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
