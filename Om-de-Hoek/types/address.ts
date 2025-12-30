/**
 * Address type definition
 * @property {string} street - The street name of the address
 * @property {string} [houseNumber] - The house number of the address (optional)
 * @property {string} postalCode - The postal code of the address
 * @property {string} villageName - The village name of the address
 * @property {string} residentId - The resident ID associated with the address
 * @property {string} adresId - The unique identifier for the address
 * @property {string} [fullAdress] - The full formatted address (optional)
 */
export type Address = {
    street: string;
    houseNumber?: string;
    postalCode: string;
    villageName: string;
    residentId: string;
    adresId: string;
    fullAdress? : string;
};

export type UpdateAddressCommand = {
    street: string;
    houseNumber?: string;
    postalCode: string;
    villageName: string;
    adresId: string;
}

export type CreateAddressCommand = {
    street: string;
    houseNumber?: string;
    postalCode: string;
}