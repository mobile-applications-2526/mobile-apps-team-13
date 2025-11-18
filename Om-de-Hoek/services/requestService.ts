const API_URL = process.env.EXPO_PUBLIC_API_PATH;

const fetchData = async (endpoint: string, options = {}) => { //God data fetcher
    console.log(`Fetching data from: ${API_URL}/api/${endpoint}`);
    
    const response = await fetch(`${API_URL}/api/${endpoint}`, options);
    console.log(response);
    if (!response.ok) {
        console.error('Fetch error:', response.statusText);
        if ([400, 409, 422].includes(response.status)) {
            const errorData = await response.json();
            console.error(errorData);
            throw new Error(`Client Error: ${errorData}, Status Code: ${response.status}`);
        }
        throw new Error(`Error: ${response.statusText}`);
    }
    return await response.json();

}

const statusCheck = async () => {
    try {
        const response = await fetch(`${API_URL}/status`);
        if (!response.ok) {
            console.error('Status check failed:', response.statusText);
            return false;
        }
        return true;
    } catch (error) {
        console.error('Status check error:', error);
        return false;
    }
}

export {fetchData, statusCheck};