import mongoose, { Schema, model, models } from "mongoose";

const stackSchema = new Schema({
  uuid: { type: String, required: true, unique: true },
  subjectId: { type: String, required: true, ref: "Subject" },
  name: { type: String, required: true },
  description: { type: String },
  cardIds: [{ type: String, ref: "Card" }],
}, { timestamps: true });

export const Stack = models.Stack || model("Stack", stackSchema);
