import { User } from "@/types/user";

const API_URL = process.env.EXPO_PUBLIC_API_PATH;

const loggedInuser = async (token: string | null) => {
    return await fetch(`${API_URL}/api/user/loggedin`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });
};

const addressByLoggedInUser = async (token: string | null) => {
    return await fetch(`${API_URL}/api/address/byloggedinuser`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });
};

const updateUser = async (user: User) => {
    return await fetch(`${API_URL}/api/user/update`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });
}

export default {
    loggedInuser,
    addressByLoggedInUser,
    updateUser
}