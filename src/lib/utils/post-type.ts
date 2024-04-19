export interface PostDetailType {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface CommentType {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}
