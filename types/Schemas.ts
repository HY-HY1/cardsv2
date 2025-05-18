interface Exam {
    uuid: string // Unique ID for this data entry
    examBoard: 'OCR' | 'AQA'| "Eduqas" | "Edexcel" | "Wjec" | string;
    examSubject: string;
    examComponent: string; // Component of exam eg Business Studies Stratgey / Paper 2
    SubjectId: string // Existing UUID That already Exists. Users must create the subject before linking or while creating exam
    Stacks: Stacks[] // Linked stacks for this exam eg topics for that exam
    ExamDate: string; // Date which exam is scheduled for
    createdAt: Date;
    updatedAt: Date
}

interface Stacks {
    id: string
}