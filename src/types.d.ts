export interface Option {
  id: string;
  answer: string;
}

export interface User {
  name: string;
  avatar: string;
}

export interface Question {
  type: string;
  id: number;
  playlist: string;
  description: string;
  image: string;
  question: string;
  options: Option[];
  user: User;
}

export interface Result {
  id: string;
  answer: string;
}

export interface Answer {
  id: string;
  correct_options: Result[];
}

export type Data = Question & { answer: Answer; time: number };
