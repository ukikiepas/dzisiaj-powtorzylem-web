export interface CommentInterface {
  commentId: number;
  body: string;
  username: string;
  parentId: number | null;
  createdAt: string;
  image?: string; // Pole na zdjęcie użytkownika
  section: string;
  sectionParticularId: number;
}
