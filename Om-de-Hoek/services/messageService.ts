import { Message } from "@/types/message";
import type { Comment } from "@/types/comment";

const API_URL = process.env.EXPO_PUBLIC_API_PATH;

const fetchMessageFeed = async (
  token: string | null,
  options?: {
    page?: number;
    pageSize?: number;
    postalCode?: string;
    buurtSectorCode?: string;
  }
): Promise<Message[]> => {
  if (!token) throw new Error("No token provided");

  const params = new URLSearchParams();

  const page = Math.max(0, Number(options?.page ?? 0));
  const pageSize = Math.max(1, Number(options?.pageSize ?? 20));

  params.append("page", page.toString());
  params.append("pageSize", pageSize.toString());

  if (options?.postalCode) params.append("postcode", options.postalCode);
  if (options?.buurtSectorCode) params.append("buurtSectorCode", options.buurtSectorCode);

  const query = params.toString();
  const url = `${API_URL}/api/message/feed?${query}`;


  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    if (response.status === 401) throw new Error("Unauthorized - Invalid or expired token");
    throw new Error(`Request failed with status ${response.status}`);
  }

  const data = await response.json();
  return data as Message[];
};

const sendMessage = async (
  token: string | null,
  payload: {
    title: string;
    content: string;
    severity: string;
    neighborhoodCode: string | null;
    neighborhoodOnly: boolean;
  }
): Promise<Message> => {
  if (!token) throw new Error("No token provide");

  const url = `${API_URL}/api/message/send`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    if (response.status === 401) throw new Error("Unauthorized - Invalid or expired token");
    throw new Error(`Request failed with status ${response.status}`);
  }

  const data = await response.json();
  return data as Message;
};

const likeMessage = async (token: string, messageId: string) => {
  const url = `${API_URL}/api/message/like/${messageId}`;

  return await fetch(url, {
    method: "POST",
    headers: {
      "Authorization" : `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

type RespondPayload = {
  messageId: string;
  content: string;
};

const respondToMessage = async (token: string , payload: RespondPayload) => {
  const url = `${API_URL}/api/message/respond`;

  await fetch(url, {
    method: "POST",
    headers: {
      "Authorization" : `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
};

export default { fetchMessageFeed, sendMessage, likeMessage, respondToMessage };
