export type MessageSeverity = "Informational" | "Warning" | "Critical";

export type Message = {
    userName: string;
    userTag: string;
    content: string;
    createdAt: string;
    severity: MessageSeverity;
    reactions: {
        author: string;
        content: string;
    }[];
    totalLikes: number;
}