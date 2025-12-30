import { Borough } from '@/types/borough';

/**
 * Municipality type representing a local government area.
 * @property nisCode - The NIS code of the municipality.
 * @property name - The name of the municipality.
 * @property postalCodes - An array of postal codes associated with the municipality.
 * @property languages - The languages spoken in the municipality.
 * @property boroughs - An array of boroughs within the municipality.
 */
export type Municipality = {
    nisCode: string;
    name: string;
    postalCodes: string[];
    languages: string;
    boroughs: Borough[];
}