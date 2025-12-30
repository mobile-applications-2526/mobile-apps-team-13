import {Municipality} from '@/types/municipality';
import {Neighborhood} from '@/types/neighborhood';

/**
 * Borough type representing a subdivision of a municipality.
 * @property nis6code - The NIS 6 code of the borough.
 * @property name - The name of the borough.
 * @property municipality - The municipality to which the borough belongs.
 * @property neighborhoods - An array of neighborhoods within the borough.
 */
export type Borough = {
    nis6code: string;
    name: string;
    municipality: Municipality;
    neighborhoods: Neighborhood[];
}