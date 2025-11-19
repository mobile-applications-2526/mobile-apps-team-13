import {UnauthorizedError} from "@/types/Errors/UnauthorizedError";
import {InvalidDataException} from "@/types/Errors/InvalidDataException";

const API_URL = process.env.EXPO_PUBLIC_API_PATH;

/**
 * @description Fetch data from the API
 * @param endpoint API endpoint to fetch data from (starts after /api/)
 * @param options Fetch options
 * @returns Parsed JSON response
 * @throws UnauthorizedError if the response status is 401 - handle token refresh and try again
 * @throws Error for other non-ok responses
 */
const fetchData = async (endpoint: string, options = {}) => { //God data fetcher

    const response = await fetch(`${API_URL}/api/${endpoint}`, options);
    if (!response.ok) {
        if(response.status === 401){
            throw new UnauthorizedError("Unauthorized - Invalid or expired token");
        }

        const errorData = await response.json();
        if(errorData && errorData.message && errorData.field ){
            throw new InvalidDataException(errorData.message, response.status, errorData.field);
        }
    }
    return await response.json();

}

/**
 * @description Check the status of the API (and wakes it up if it's sleeping)
 * @returns true if the API is reachable, false otherwise
 */
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