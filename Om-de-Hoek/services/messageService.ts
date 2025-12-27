import { Message } from "@/types/message";

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

  console.log("Fetching messages from:", url);

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

export default { fetchMessageFeed };
