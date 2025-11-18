import {AuthResponse, LoginBody, RegisterRequestBody} from "@/types/auth";
import { fetchData } from "./requestService";


const authRegister = async (data: RegisterRequestBody) => {
    await fetchData('auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
};

const authLogin = async (data: LoginBody) => {
    const response = await fetchData('auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    return response as AuthResponse;
}


export {
    authRegister,
    authLogin
};