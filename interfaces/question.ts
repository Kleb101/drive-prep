export interface Question {
  answer: number;
  choices: string[];
  comment?: string;
  description?: string;
  id: number;
  imageSrc?: string;
  question: string;
}

export interface AnsweredQuestion extends Question {
  isCorrect: boolean;
  selectedAnswerIndex: number;
}
