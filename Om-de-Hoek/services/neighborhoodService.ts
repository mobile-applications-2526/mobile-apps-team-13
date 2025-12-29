import { fetchData } from "./requestService";

const fetchNeighborhoodsByPostalCode = async (postalcode: string) => {
  return await fetchData(`/neighborhood/postalcode/${postalcode}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const fetchNeighborhoodsByStatisticalSectorCode = async (
  statisticalSectorCode: string
) => {
  return await fetchData(`/neighborhood/sectorcode/${statisticalSectorCode}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const addToNeighborhood = async (id: string, token: string | null) => {
  return await fetchData(`/neighborhood/join/${id}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

const removeFromNeighborhood = async (id: string, token: string | null) => {
  return await fetchData(`/neighborhood/leave/${id}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

export default {
  fetchNeighborhoodsByPostalCode,
  fetchNeighborhoodsByStatisticalSectorCode,
  addToNeighborhood,
  removeFromNeighborhood,
};
