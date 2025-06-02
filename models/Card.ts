import mongoose, { Schema, model, models } from "mongoose";

const cardSchema = new Schema({
  uuid: { type: String, required: true, unique: true },
  stackId: { type: String, required: true, ref: "Stack" },
  question: { type: String, required: true },
  answer: { type: String, required: true },
  hint: { type: String },
  imageUrl : { type: String, unique: true},
  correctAttempts: { type: Number, default: 0 },
  attempts: { type: Number, default: 0 },
  lastAttempted: { type: Date },
}, { timestamps: true });

export const Card = models.Card || model("Card", cardSchema);
