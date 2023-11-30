export interface CommentInterface {
  commentId: number;
  body: string;
  username: string;
  userId: number
  parentId: number | null;
  createdAt: string;
}
