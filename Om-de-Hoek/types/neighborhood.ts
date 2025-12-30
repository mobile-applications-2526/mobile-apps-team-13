import {User} from './user';
import {Borough} from './borough';

/**
 * Neighborhood type representing a local area within a borough.
 * @property name - The name of the neighborhood.
 * @property statischeSectorCode - The static sector code of the neighborhood.
 * @property residents - An array of users residing in the neighborhood.
 * @property borough - The borough to which the neighborhood belongs.
 */
export type Neighborhood = {
  name: string;
  statischeSectorCode: string;
  residents: User[];
  borough: Borough;
};
