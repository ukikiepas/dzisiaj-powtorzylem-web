
export interface IrregularVerb {
  baseForm: string;
  pastSimple: string
  pastParticiple: string
  translation: string
  userPastSimple?: string;
  userPastParticiple?: string;
  userTranslation?: string;
  isPastSimpleCorrect?: boolean;
  isPastParticipleCorrect?: boolean;
  isTranslationCorrect?: boolean;
}

export interface IrregularVerbDto {

  baseForm: string
  pastSimple: string
  pastParticiple: string
  translation: string

}

export interface IrregularVerbDtoResponse {
  baseForm: string
  userPastSimple?: string;
  userPastParticiple?: string;
  userTranslation?: string;
  isPastSimpleCorrect?: boolean;
  isPastParticipleCorrect?: boolean;
  isTranslationCorrect?: boolean;
}

