const API_URL = process.env.EXPO_PUBLIC_API_PATH;

const fetchNeighborhoodsByPostalCode = async (postcode: string) => {
    return await fetch(`${API_URL}/api/buurt/postcode/${postcode}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
}

export default {
    fetchNeighborhoodsByPostalCode,
}