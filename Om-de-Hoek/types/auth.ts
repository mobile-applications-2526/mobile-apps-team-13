export type RegisterBody = {
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
    birthDate: Date;
    phoneNumber?: string;
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