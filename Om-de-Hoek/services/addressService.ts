import {Address, UpdateAddressCommand} from "@/types/address";
import {fetchData} from "@/services/requestService";

const RegisterAddress = async (address: Address, token: string) => {
  return await fetchData(`/address`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(address),
  });
};

const GetAllByAuthenticatedUser = async (token: string) : Promise<Address[]>   => {
    const response = await fetchData("/address/byloggedinuser", {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        }
    })

    return response as Address[];
}

const UpdateSingleAddress = async (address: UpdateAddressCommand, token: string) : Promise<Address> => {
    return await fetchData("/address", {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(address),
    })
}

export default {
    RegisterAddress,
    GetAllByAuthenticatedUser,
    UpdateSingleAddress
}
