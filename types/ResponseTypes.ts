
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