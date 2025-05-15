
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
  name: string; // Add name
  description: string; // Add description
};
  

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
