import { Document } from "mongoose";
import { Interface } from "readline";

// ========================
// Shared Base Interfaces
// ========================

export interface BaseDocument {
  _id: string;
  uuid: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ErrorResponse {
  error: string;
}

// ========================
// Card Types
// ========================

export interface Card extends BaseDocument {
  stackId: string;
  question: string;
  answer: string;
  hint: string;
  correctAttempts: string;
  attempts: string;
}

export type GetCardsResponse = {
  cards: Card[];
};

export type CreateCardResponse = {
  message: string;
  card: Card;
};

// ========================
// Stack Types
// ========================

export interface Stack extends BaseDocument {
  name: string;
  description: string;
  subjectId: string;
  cardIds: string[];
}

export type GetStackResponse = {
  stacks: Stack[];
};

export type CreateStackResponse = {
  message: string;
  stack: Stack;
};

export type EditStackResponse = {
  message: string;
  stack: Stack;
};

export type DeleteStackResponse = {
  message: string;
};

// ========================
// Subject Types
// ========================

export interface Subject extends BaseDocument {
  name: string;
  description: string;
  stackIds: string[];
}

export type GetSubjectsResponse = {
  results: Subject[];
};

export type GetSubjectByIDResponse = {
  subject: Subject[];
};

export type CreateSubjectResponse = {
  message: string;
  data: Stack;
};

// ========================
// Exam Types
// ========================

export interface ExamBase extends Document {
  uuid: string;
  examBoard: string;
  examSubject: string;
  SubjectId: string;
  ExamDate: string; // ISO date string
  examComponent: string;
  Stacks: string[]; // UUIDs of linked stacks
}

export interface Exam extends ExamBase {
  createdAt: string;
  updatedAt: string;
}

export interface ExamResponseTypes extends ExamBase {
  
}

export interface ExamResponse {
  exam: ExamResponseTypes
}


export interface ExamsResponse {
  exams: ExamBase[];
}

export interface CreateExamRequest extends Omit<ExamBase, 'uuid' | 'Stacks'> {
  Stacks?: string[];
}

export interface UpdateExamRequest extends Partial<Omit<ExamBase, 'uuid'>> {}

export interface CreateExamResponse extends ExamResponse {}

export interface UpdateExamResponse extends ExamResponse {}

export interface DeleteExamResponse {
  deleted: ExamBase;
}

// ========================
// Stack Link Types
// ========================

export interface ExamIdParams {
  id: string; // UUID of exam
}

export interface StackLinkParams extends ExamIdParams {
  stackId: string;
}

export interface StackLinkResponse {
  message: string; // e.g., "Stack linked" or "Stack unlinked"
  exam: Pick<ExamBase, 'uuid' | 'Stacks'>;
}


export interface getRevisionCards {
  stacks: Stack[],
  cards: Card[]
}