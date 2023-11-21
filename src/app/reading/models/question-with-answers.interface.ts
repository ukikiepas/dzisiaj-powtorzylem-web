
export interface QuestionWithAnswers {
  questionId: number;
  questionText: string;
  answers: Answer[];
  answered?: boolean;
  userCorrect?: boolean;
  answerMarker: string;
  highlight: boolean;
}

export interface Answer {
  answerId: number;
  answerText: string;
  correct: boolean;
}
