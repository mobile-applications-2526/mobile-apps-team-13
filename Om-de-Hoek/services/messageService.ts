import {Message, MessageResponseCommand} from "@/types/message";
import {fetchData} from "./requestService";

const fetchMessageFeed = async (
  token: string | null,
  options?: {
    page?: number;
    pageSize?: number;
    postalCode?: string;
    buurtSectorCode?: string;
  }
): Promise<Message[]> => {
  const params = new URLSearchParams();

  const page = Math.max(0, Number(options?.page ?? 0));
  const pageSize = Math.max(1, Number(options?.pageSize ?? 20));

  params.append("page", page.toString());
  params.append("pageSize", pageSize.toString());

  if (options?.postalCode) params.append("postcode", options.postalCode);
  if (options?.buurtSectorCode)
    params.append("buurtSectorCode", options.buurtSectorCode);

  const query = params.toString();

  const data = await fetchData(`/message/feed?${query}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

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
  const data = await fetchData(`/message/send`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return data as Message;
};

const likeMessage = async (token: string, messageId: string) : Promise<Message> => {
  return await fetchData(`/message/like/${messageId}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

const respondToMessage = async (token: string, payload: MessageResponseCommand) : Promise<void> => {
  await fetchData(`/message/respond`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
};

export default { fetchMessageFeed, sendMessage, likeMessage, respondToMessage };
