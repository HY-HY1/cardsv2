
export interface BaseFlashcard {
    _id: string;
    uuid: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
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