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
  birthDate: string
  firstName: string,
  lastName: string,
}

export type LoginBody = {
    email: string;
    password: string;
}

/**
 * Response returned upon successful authentication.
 * @property {string} token - The authentication token
 * @property {string} email - The email of the authenticated user
 * @property {string} id - The unique identifier of the authenticated user
 * @property {string} refreshToken - The refresh token for obtaining new authentication tokens
 */
export type AuthResponse = {
    token: string;
    email: string;
    id: string;
    refreshToken: string;
}