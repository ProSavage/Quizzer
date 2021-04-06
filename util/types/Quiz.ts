export default interface Quiz {
  _id: string;
  name: string;
  description: string;
  questions: QuizQuestion[];
}

export interface QuizQuestion {
  question: string;
  answers: QuizAnswer[];
}

export interface QuizAnswer {
  answer: string;
  correct: boolean;
}
