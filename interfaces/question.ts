export interface Question {
  answer: number;
  choices: string[];
  comment?: string;
  description?: string;
  id: number;
  imageSrc?: string;
  question: string;
}
