import { NextResponse } from "next/server";
import { Subject } from "@/models/Subject";
import { createDocument} from "@/utils/CrudHandlers";
import { v4 as uuidv4 } from "uuid"; // Import the uuid function
import { mongooseConnect } from "@/lib/Mongoose";
import redis from "@/lib/Redis";

export async function GET() {
  try {
    const cachedResults = await redis.get("Subjects")

    if(cachedResults) {
      return NextResponse.json(
        { results: JSON.parse(cachedResults), message: "Cache Hit"}, // Return empty array if no results
        { status: 200 }
      );
    }

    await mongooseConnect();

    const results = await Subject.find().exec();

    redis.set("Subjects", JSON.stringify(results))

    return NextResponse.json(
      { results: results.length > 0 ? results : [] }, // Return empty array if no results
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching data: ", error);

    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
};


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

    const cachedData = await redis.get("Subjects");

    let updatedSubjects;
    if (cachedData) {
      const parsed = JSON.parse(cachedData);
      updatedSubjects = [newSubject, ...parsed]; // Add new subject to the beginning
    } else {
      updatedSubjects = [newSubject]; // First entry
    }

    await redis.set("Subjects", JSON.stringify(updatedSubjects));

    // Return success response
    return NextResponse.json(
      { message: "Subject created successfully", data: newSubject },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
