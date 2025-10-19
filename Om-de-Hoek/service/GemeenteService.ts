import { API_URL} from "@env";

type Gemeente = {
    id: number;
    naam: string;
    postcodes: string[];
    talen: string;
}

export async function fetchGemeenteByPostcode(postcode: string, taal: string = "Nl") {
    try {
        const adress = `${API_URL}/gemeente/postcode/${postcode}/${taal}`

        console.log(`Fetching gemeente from: ${adress}`)

        const response = await fetch(adress);
        if (!response.ok) {
            throw new Error(`Error fetching gemeente: ${response.statusText}`);
        }
        const result: Gemeente[] = await response.json();
        return result[0];
    } catch (error) {
        console.error("Failed to fetch gemeente by postcode:", error);
        throw error;
    }
}