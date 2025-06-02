import { NextResponse } from "next/server";
import { Card } from "@/models/Card";
import { mongooseConnect } from "@/lib/Mongoose";

export async function PUT(req: Request, { params }: { params: { uuid: string } }) {
  try {
    await mongooseConnect(); // Ensure DB is connected

    const { type } = await req.json();
    const { uuid } = await params;


    if (!uuid || !type) {
      return NextResponse.json({ error: "Missing uuid or type" }, { status: 400 });
    }

    const card = await Card.findOne({ uuid });

    if (!card) {
      return NextResponse.json({ error: "Card not found" }, { status: 404 });
    }

    card.attempts += 1;
    if (type === "correct") {
      card.correctAttempts += 1;
    }

    card.lastAttempted = new Date();
    await card.save();

    return NextResponse.json({ success: true, card });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
