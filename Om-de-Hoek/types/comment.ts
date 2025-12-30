/**
 * Represents a comment made by a user.
 * @property {string} author - The name of the comment's author.
 * @property {string} content - The content of the comment.
 * @property {Date} createdAt - The date and time when the comment was created.
 */
export type Comment = {
  author: string;
  content: string;
  createdAt: Date;
};
