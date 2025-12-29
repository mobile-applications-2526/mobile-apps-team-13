import { Address } from "@/types/address";
import { fetchData } from "./requestService";

const RegisterAddress = async (address: Address, token: string) => {
  return await fetchData(`/address`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(address),
  });
};

export default {
  RegisterAddress,
};
