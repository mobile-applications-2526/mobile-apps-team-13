const API_URL = process.env.EXPO_PUBLIC_API_PATH;

const fetchNeighborhoodsByPostalCode = async (postalcode: string) => {
    return await fetch(`${API_URL}/api/neighborhood/postalcode/${postalcode}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
}

const fetchNeighborhoodsByStatisticalSectorCode = async (statisticalSectorCode: string) => {
    return await fetch(`${API_URL}/api/neighborhood/sectorcode/${statisticalSectorCode}`, {
        method: 'GET', 
        headers: {
            'Content-Type': 'application/json',
        },
    });
}

const addToNeighborhood = async (id: string, token: string | null) => {
    return await fetch(`${API_URL}/api/neighborhood/join/${id}`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });
};

const removeFromNeighborhood = async (id: string, token: string | null) => {
    return await fetch(`${API_URL}/api/neighborhood/leave/${id}`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });
}

export default {
    fetchNeighborhoodsByPostalCode,
    fetchNeighborhoodsByStatisticalSectorCode,
    addToNeighborhood,
    removeFromNeighborhood,
}