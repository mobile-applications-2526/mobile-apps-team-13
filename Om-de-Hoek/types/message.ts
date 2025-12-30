import {Comment} from "./comment";

export type MessageSeverity = "Informational" | "Warning" | "Critical";

/**
 * Represents a message posted by a user.
 * @property {string} userName - The name of the user who posted the message. (Firtsname + Lastname)
 * @property {string} userTag - The tag or handle of the user.
 * @property {string} title - The title of the message.
 * @property {string} content - The content/body of the message.
 * @property {Date} createdAt - The date and time when the message was created.
 * @property {MessageSeverity} severity - The severity level of the message.
 * @property {Array<Comment>} reactions - An array of reactions to the message, each containing the author's name and the reaction content.
 * @property {number} totalLikes - The total number of likes the message has received.
 * @property {string} id - The unique identifier for the message.
 * @property {boolean} likedByUser - Indicates whether the current user has liked the message.
 */
export type Message = {
  userName: string;
  userTag: string;
  title: string;
  content: string;
  createdAt: Date;
  severity: MessageSeverity;
  reactions: Comment[];
  totalLikes: number;
  id: string;
  likedByUser: boolean;
};

export type MessageResponseCommand = {
  messageId: string;
  content: string;
};

export type UpdateMessageCommand = {
  title: string;
  content: string;
  severity: MessageSeverity;
  id: string;
};
