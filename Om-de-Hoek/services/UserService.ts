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

export default {
    loggedInuser,
    addressByLoggedInUser,
}