import mongoose, { Schema, Document } from 'mongoose';

export interface IExam extends Document {
  uuid: string;
  examBoard: 'OCR' | 'AQA' | 'Eduqas' | 'Edexcel' | 'Wjec' | string;
  examSubject: string;
  examComponent: string;
  SubjectId: string;           
  Stacks: string[];            
  ExamDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

const ExamSchema: Schema = new Schema<IExam>(
  {
    uuid: {
      type: String,
      required: true,
      unique: true,
    },
    examBoard: {
      type: String,
      enum: ['OCR', 'AQA', 'Eduqas', 'Edexcel', 'Wjec'],
      required: true,
    },
    examSubject: {
      type: String,
      required: true,
    },
    examComponent: {
      type: String,
      required: true,
    },
    SubjectId: {
      type: String,       // ✅ Changed from ObjectId to String
      required: true,
      ref: 'Subject',
    },
    Stacks: [
      {
        type: String,     // ✅ Changed from ObjectId to String
        ref: 'Stack',
      },
    ],
    ExamDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Exam || mongoose.model<IExam>('Exam', ExamSchema);
