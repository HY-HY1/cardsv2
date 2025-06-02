import { NextResponse } from "next/server";
import { Card } from "@/models/Card";
import { Stack } from "@/models/Stack";
import { mongooseConnect } from "@/lib/Mongoose";
import { v4 as uuidv4 } from "uuid"

export async function GET(req: Request, { params }: { params: { id: string } }) {
    try {
      const { id } = params;
  
      await mongooseConnect();
  
      const findStackCards = await Card.find({ stackId: id });
  
      if (findStackCards.length === 0) {
        return NextResponse.json({ error: "No cards found for this stack" }, { status: 404 });
      }
  
      return NextResponse.json({ cards: findStackCards }, { status: 200 });
  
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
  }
  

  export async function POST(req: Request, { params }: { params: { id: string } }) {
    try {
      const { id } = params; // Stack ID
      const { question, answer, hint, imageUrl } = await req.json();
  
      if (!question || !answer) {
        return NextResponse.json({ error: "Question and Answer are required" }, { status: 400 });
      }
  
      await mongooseConnect();
  
      const uuid = uuidv4();

      // if(imageUrl) {
      //   console.log()
      //   return NextResponse.json(`Image Found ${imageUrl}, type ${typeof imageUrl}`, { status: 400})
      // }
  
      const newCard = new Card({
        uuid: uuid,
        stackId: id,
        question: question,
        answer: answer,
        hint: hint,
        imageUrl: imageUrl
      });
  
      await newCard.save();
  
      const stack = await Stack.findOne({ uuid: id });
      if (!stack) {
        return NextResponse.json({ error: "Stack not found" }, { status: 404 });
      }
  
      stack.cardIds.push(uuid);
      await stack.save();
  
      return NextResponse.json({ message: "Card added successfully", card: newCard }, { status: 201 });
  
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
  }
  

  export async function PUT(req: Request, { params }: { params: { id: string } }) {
    try {
      const { id } = params; // Card ID
      const { question, answer, hint, imageUrl } = await req.json(); // Extract data from request body

      console.log(question, answer, hint, imageUrl)
  
      if (!question || !answer) {
        return NextResponse.json({ error: 'Question and Answer are required' }, { status: 400 });
      }
  
      await mongooseConnect();
  
      const card = await Card.findOne({ uuid: id });
      if (!card) {
        return NextResponse.json({ error: 'Card not found' }, { status: 404 });
      }
  
      card.question = question;
      card.answer = answer;
      card.hint = hint || card.hint;
      card.imageUrl = imageUrl || card.imageUrl
      
  
      // Save the updated card
      await card.save();
  
      return NextResponse.json({ message: 'Card updated successfully', card }, { status: 200 });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
  }
  
  // DELETE Request: Delete Card and Remove from Stack's cardIds Array
  export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
      const { id } = params; // Card ID
  
      // Connect to database
      await mongooseConnect();
  
      // Find the card by UUID
      const card = await Card.findOne({ uuid: id });
      if (!card) {
        return NextResponse.json({ error: 'Card not found' }, { status: 404 });
      }
  
      // Remove the card from the stack's cardIds array
      const stack = await Stack.findOne({ cardIds: id });
      if (stack) {
        stack.cardIds = stack.cardIds.filter((cardId: string) => cardId !== id);
        await stack.save();
      }
  
      // Delete the card
      await card.deleteOne();
  
      return NextResponse.json({ message: 'Card deleted successfully' }, { status: 200 });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
  }
  