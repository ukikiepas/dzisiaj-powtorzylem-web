import {Time} from "@angular/common";

export interface UserResult {
  resultId: number;
  setId: number;
  username: string;
  correctAnswers: number;
  badAnswers: number;
  score: number;
  durationTime: number; // duration in milliseconds
  insertTime: Date; // format 'yyyy-MM-ddTHH:mm:ss'
}

export interface UserResultAnswer {
  id: number | null;
  resultId: number | null;
  vocabularyWord: string;
  userAnswer: string;
  isCorrect: boolean;
}

export interface UserResultDto {
  resultId: number | null;
  setId: number;
  username: string;
  correctAnswers: number;
  badAnswers: number;
  score: number;
  durationTime: number; // duration in milliseconds
  insertTime: Date; // format 'yyyy-MM-ddTHH:mm'
  answers: UserResultAnswer[];
}
