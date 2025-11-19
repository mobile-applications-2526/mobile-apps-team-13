import {fetchData} from './requestService';
import {Gemeente} from '@/types/gemeente';

const fetchGemeenten = async (taal: string = "Nl"): Promise<Gemeente[]> => {
    const data = await fetchData(`gemeente?taal=${taal}`);
    return data as Gemeente[];
}

const fetchGemeenteByPostcode = async (postcode: string, taal: string = "Nl"): Promise<Gemeente[]> => {
    const data = await fetchData(`gemeente/postcode/${postcode}?taal=${taal}`);
    return data as Gemeente[];
}

export default {
    fetchGemeenten,
    fetchGemeenteByPostcode
};