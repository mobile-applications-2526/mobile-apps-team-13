export type RegisterBody = {
    email: string;
    firstName: string;
    lastName: string;
    streetName: string;
    houseNumber?: string;
    municipality: string;
    postalCode: string;
    password: string;
    birthDate: Date;
    phoneNumber?: string;
}
export type RegisterRequestBody = {
  email: string,
  phoneNumber: string,
  password: string,
  username: string,
  birthDate: string
}

export type LoginBody = {
    email: string;
    password: string;
}

export type AuthResponse = {
    token: string;
    email: string;
    id: string;
}