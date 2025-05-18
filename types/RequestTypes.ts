export interface CreateSubject {
    name: string ;
    description: string | undefined;
}

export interface EditSubject extends CreateSubject {
    id: string;
}

export interface CreateStack {
    name: string;
    description: string | undefined;
}


export interface EditStack {
    name: string;
    description: string | undefined;
}

export interface CreateCard {
    question: string;
    answer: string;
    hint?: string ;
}

export interface CreateExamRequest {
    examBoard: string;
    examSubject: string;
    SubjectId: string;
    examDate: string; // ISO string
    examComponent: string;
    Stacks?: string[]; // array of UUIDs
  }
  

  export interface ExamBase {
    uuid: string;
    examBoard: string;
    examSubject: string;
    SubjectId: string;
    ExamDate: string;         // ISO date string
    examComponent: string;
    Stacks: string[];         // Array of UUID strings
  }
  
  // Used when creating a new exam (uuid is generated server-side)
  export interface CreateExamRequest extends Omit<ExamBase, 'uuid' | 'Stacks'> {
    Stacks?: string[];        // Optional for creation
  }
  
  // Used when updating any part of an exam
  export interface UpdateExamRequest extends Partial<Omit<ExamBase, 'uuid'>> {}
  
  // For GET/PUT/DELETE routes that target an exam by ID
  export interface ExamIdParams {
    id: string;               // UUID of the exam
  }
  
  // For linking/unlinking a stack to an exam
  export interface StackLinkParams extends ExamIdParams {
    stackId: string;          // UUID of the stack
  }