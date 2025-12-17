import { address } from "@/types/address";

const API_URL = process.env.EXPO_PUBLIC_API_PATH;

const RegisterAddress = async (address: address, token: string) => {
    return await fetch(`${API_URL}/api/address`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(address),
    })
};

export default {
    RegisterAddress,
}