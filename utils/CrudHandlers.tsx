// lib/crudHandlers.ts
import { NextRequest, NextResponse } from "next/server";
import { Model } from "mongoose";
import { mongooseConnect } from "@/lib/Mongoose";



export function createGetByIdHandler(model: Model<any>) {
  return async function GET(
    _: NextRequest,
    context: { params: { id: string } }
  ) {
    try {
      const doc = await model.findById(context.params.id).exec();
      if (!doc) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
      }
      return NextResponse.json(doc, { status: 200 });
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        { error: "Invalid ID or failed to fetch" },
        { status: 400 }
      );
    }
  };
}


// Utility function to create a document in the specified model
export async function createDocument(model: Model<any>, data: object, params?: string ) {
  try {
    await mongooseConnect();

    // Create a new document with the model and the provided data
    const newDoc = new model(data);

    // Save the new document to the database
    await newDoc.save();

    // Return the newly created document (or some success message)
    return newDoc;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create document");
  }
}


export function createDeleteHandler(model: Model<any>) {
  return async function DELETE(
    _: NextRequest,
    context: { params: { id: string } }
  ) {
    try {
      const deleted = await model.findByIdAndDelete(context.params.id);
      if (!deleted) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
      }
      return NextResponse.json(
        { message: "Deleted successfully" },
        { status: 200 }
      );
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: "Failed to delete" }, { status: 400 });
    }
  };
}
