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