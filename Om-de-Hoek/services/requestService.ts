const API_URL = process.env.EXPO_PUBLIC_API_PATH;

const fetchData = async (endpoint: string, options = {}) => {
    try {
        console.log(`Fetching data from: ${API_URL}/api/${endpoint}`);
        const response = await fetch(`${API_URL}/api/${endpoint}`, options);
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}

const statusCheck = async () => {
    try {
        const response = await fetch(`${API_URL}/status`);
        if (!response.ok) {
            throw new Error(`Status check failed: ${response.statusText}`);
        }
        return true;
    } catch (error) {
        console.error('Status check error:', error);
        return false;
    }
}

export {fetchData, statusCheck};