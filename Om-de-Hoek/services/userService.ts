import { User } from "@/types/user";
import { fetchData } from "./requestService";

const loggedInuser = async (token: string | null) => {
    return await fetchData(`/user/loggedin`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });
};

const addressByLoggedInUser = async (token: string | null) => {
    return await fetchData(`/address/byloggedinuser`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });
};

const updateUser = async (user: User, token: string | null) => {
    return await fetchData(`/user/update`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });
};

export default {
    loggedInuser,
    addressByLoggedInUser,
    updateUser,
};