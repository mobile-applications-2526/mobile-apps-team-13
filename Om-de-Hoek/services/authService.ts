import {  RegisterRequestBody } from "@/types/auth";
import { fetchData } from "./requestService";


const authRegister = async (data: RegisterRequestBody) => {
    await fetchData('auth/register', {
        method: 'POST',
        
        body: JSON.stringify(data),
    });
};


export {
    authRegister
};