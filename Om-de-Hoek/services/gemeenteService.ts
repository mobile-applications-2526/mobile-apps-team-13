import {fetchData} from "./requestService";
import {Municipality} from "@/types/municipality";

const fetchGemeenten = async (taal: string = "Nl"): Promise<Municipality[]> => {
  const data = await fetchData(`gemeente?taal=${taal}`);
  return data as Municipality[];
};

const fetchGemeenteByPostcode = async (
  postcode: string,
  taal: string = "Nl"
): Promise<Municipality[]> => {
  const data = await fetchData(`gemeente/postcode/${postcode}?taal=${taal}`);
  return data as Municipality[];
};

export default {
  fetchGemeenten,
  fetchGemeenteByPostcode,
};
