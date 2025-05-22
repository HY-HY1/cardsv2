import { Document } from "mongoose";

export interface BaseFlashcard {
    _id: string;
    uuid: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    error: string | undefined
}

export interface Subject extends BaseFlashcard {
    name: string;
    description: string;
    stackIds: string[]
}

export interface GetSubjectsRequestTypes {
    results: Subject[] 
  }

export interface Stack extends BaseFlashcard {
  uuid: string;
  cardIds: string[];
  name: string;
  description: string;
  subjectId: string;
}

export type GetSubjectByIDResponse = {
  subject: Subject[]
}

export type GetStackResponse = {
  stacks: Stack[];
};

export type CreateStackResponse = {
  message: string; 
  stack: Stack[]
}

export type DeleteStackResponse = {
  message: string;
};

export type EditStackResponse = {
  stack: Stack;
  message: string;
};

export type CreateSubjectResponse = {
  message: string;
  data: Stack
}


export interface Card extends BaseFlashcard {
  stackId: string;
  question: string;
  answer: string;
  hint: string;
  correctAttempts: string;
  attempts: string;
}

export type GetCardsResponse = {
  Cards: Card[];
}

export type CreateCardResponse = {
  message: string;
  card: Card
}

export interface ExamBase extends Document {
  uuid: string;
  examBoard: string;
  examSubject: string;
  SubjectId: string;
  ExamDate: string;       // ISO date string
  examComponent: string;
  Stacks: string[];       // Array of UUID strings
}


export interface CreateExamRequest extends Omit<ExamBase, 'uuid' | 'Stacks'> {
  Stacks?: string[];
}

export interface UpdateExamRequest extends Partial<Omit<ExamBase, 'uuid'>> {}

export interface ExamIdParams {
  id: string; // UUID of exam
}

export interface StackLinkParams extends ExamIdParams {
  stackId: string; // UUID of stack
}



export interface ExamsResponse {
  exams: ExamBase[];
}

export interface CreateExamResponse extends ExamResponse {}

export interface UpdateExamResponse extends ExamResponse {}

export interface DeleteExamResponse {
  deleted: ExamBase;
}

export interface StackLinkResponse {
  message: string;    // "Stack linked" or "Stack unlinked"
  exam: Pick<ExamBase, 'uuid' | 'Stacks'>;
}


export interface ErrorResponse {
  error: string;
}

export interface ExamWithStacks {
  
}

export interface ExamResponse {
  exam: ExamBase & {
    _id: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    Stacks: string[];  // UUIDs
  };
  linkedStacks: Stack[];
}

