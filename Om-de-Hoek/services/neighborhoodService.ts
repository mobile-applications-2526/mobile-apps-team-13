import {fetchData} from "./requestService";
import {Neighborhood} from "@/types/neighborhood";

const fetchRecommendedNeighborhoods = async (token: string) : Promise<Neighborhood[]> => {
  return await fetchData(`/neighborhood/recommended`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

const fetchNeighborhoodsByPostalCode = async (postalcode: string): Promise<Neighborhood[]> => {
  return await fetchData(`/neighborhood/postalcode/${postalcode}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const fetchNeighborhoodsByStatisticalSectorCode = async (
  statisticalSectorCode: string
): Promise<Neighborhood> => {
  return await fetchData(`/neighborhood/sectorcode/${statisticalSectorCode}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const addToNeighborhood = async (id: string, token: string | null) : Promise<{message: string}> => {
  return await fetchData(`/neighborhood/join/${id}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

const removeFromNeighborhood = async (id: string, token: string | null): Promise<{message: string}> => {
  return await fetchData(`/neighborhood/leave/${id}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

export default {
  fetchRecommendedNeighborhoods,
  fetchNeighborhoodsByPostalCode,
  fetchNeighborhoodsByStatisticalSectorCode,
  addToNeighborhood,
  removeFromNeighborhood,
};
