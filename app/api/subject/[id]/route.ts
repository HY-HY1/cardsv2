import { NextResponse } from "next/server";
import { Subject } from "@/models/Subject";
import { mongooseConnect } from "@/lib/Mongoose";
import redis from "@/lib/Redis";

export async function GET(req: Request, { params }: { params: { id: string } }) {

    try {
        const { id } = params;

        await mongooseConnect()

        const findSubject = await Subject.findOne({uuid: id})

        if (!findSubject) {
            return NextResponse.json({error: "Resouce wasnt found"}, { status: 400})
        }

        return NextResponse.json({subject: findSubject}, { status: 200})
    } catch (error) {
        console.error(error)
        return NextResponse.json({error: "Internal Server Error"}, { status: 500})
    }
}


export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const { name, description } = await req.json();

    await mongooseConnect();

    const subject = await Subject.findOne({ uuid: id });

    if (!subject) {
      return NextResponse.json({ error: "Subject not found" }, { status: 404 });
    }

    if (name !== undefined) subject.name = name;
    if (description !== undefined) subject.description = description;

    await subject.save();

    const cachedData = await redis.get("Subjects");
    if (cachedData) {
      const parsed = JSON.parse(cachedData);
      const updated = parsed.map((item: any) =>
        item.uuid === id ? { ...item, name, description } : item
      );
      await redis.set("Subjects", JSON.stringify(updated));
    }

    return NextResponse.json({ message: "Subject updated", subject }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}



export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    await mongooseConnect();

    const deleteSubject = await Subject.findOneAndDelete({ uuid: id });

    if (!deleteSubject) {
      return NextResponse.json({ error: "Resource wasn't found" }, { status: 400 });
    }

    const cachedData = await redis.get("Subjects");
    if (cachedData) {
      const parsed = JSON.parse(cachedData);
      const filtered = parsed.filter((item: any) => item.uuid !== id);
      await redis.set("Subjects", JSON.stringify(filtered));
    }

    return NextResponse.json({ subject: deleteSubject }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
