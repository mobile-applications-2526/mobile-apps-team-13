export type MessageSeverity = "Informational" | "Warning" | "Critical";

export type Message = {
    userName: string;
    userTag: string;
    title: string;
    content: string;
    createdAt: string;
    severity: MessageSeverity;
    reactions: {
        author: string;
        content: string;
    }[];
    totalLikes: number;
    id: string;
    likedByUser: boolean;
}