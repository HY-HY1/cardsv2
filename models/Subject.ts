import mongoose, { Schema, model, models } from "mongoose";

const subjectSchema = new Schema({
  uuid: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String },
  stackIds: [{ type: String, ref: "Stack" }],
}, { timestamps: true });

export const Subject = models.Subject || model("Subject", subjectSchema);
