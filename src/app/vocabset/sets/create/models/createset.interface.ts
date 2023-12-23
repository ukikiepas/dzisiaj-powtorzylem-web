export interface CreateVocabularySetDto {
  id: number;
  title: string;
  description?: string;
  category?: string;
  isPublic: boolean;
  vocabularyDtos: CreateVocabularyDto[];
}

export interface CreateVocabularyDto {
  wordId: number;
  word: string;
  translation: string;
  definition?: string;
  imageLocation?: string;
}

