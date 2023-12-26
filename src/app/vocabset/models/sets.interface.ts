
export interface VocabularySet {
  id: number;
  title: string;
  description: string;
  creator: string;
  category: string;
  isPublic: boolean;
  isActive: boolean;
  lastReviewed: Date;
  isCreatedByAdmin: boolean;
  creationDate: Date;
  vocabularyDtos: Vocabulary[];
}

export interface Vocabulary {
  wordId: number;
  word: string;
  translation: string;
  definition: string;
  level: string;
  imageLocation: string;
  isFavourited: boolean;
}

export interface VocabularySetViewDto {
  id: number;
  title: string;
  description: string;
  creator: string;
  creationDate: Date;
}
