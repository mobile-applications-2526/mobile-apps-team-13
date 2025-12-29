import {Address, CreateAddressCommand, UpdateAddressCommand} from "@/types/address";
import {fetchData} from "@/services/requestService";

const RegisterAddress = async (address: CreateAddressCommand, token: string) => {
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

const DeleteAddress = async (addressId: string, token: string) => {
    return await fetchData(`/address/${addressId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        }
    })
}

export default {
    RegisterAddress,
    GetAllByAuthenticatedUser,
    UpdateSingleAddress,
    DeleteAddress
}
