import {Address} from './address';
import {Neighborhood} from './neighborhood';

/**
 * User type definition
 * @property {string} userName - The username of the user
 * @property {string} [phoneNumber] - The phone number of the user (optional)
 * @property {string} email - The email address of the user
 * @property {string} firstName - The first name of the user
 * @property {string} lastName - The last name of the user
 * @property {string} birthDate - The birth date of the user in YYYY-MM-DD format
 * @property {Address[]} addresses - An array of addresses associated with the user
 * @property {Neighborhood[]} neighborhoods - An array of neighborhoods associated with the user
 * @property {string} role - The role of the user
 * @property {string} id - The unique identifier of the user
 */
export type User = {
  userName: string;
  phoneNumber?: string;
  email: string;
  firstName: string;
  lastName: string;
  birthDate: string; // Format: YYYY-MM-DD
  addresses: Address[]
  neighborhoods: Neighborhood[];
  role: string;
  id: string;
};

export type UserUpdateCommand = {
  phoneNumber?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  userName?: string;
};