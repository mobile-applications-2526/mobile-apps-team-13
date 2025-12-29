import {ScrollView} from "react-native";
import {useEffect, useState} from "react";
import {Address, UpdateAddressCommand} from "@/types/address";
import addressService from "@/services/addressService";
import {useAuth} from "@/components/auth/context/AuthContext";
import AdressCard from "@/components/card/AdressCard";
import SettingsHeader from "@/components/settings/SettingsHeader";
import {useTranslation} from "react-i18next";
import {UnauthorizedError} from "@/types/Errors/UnauthorizedError";

const AddressSettings = () => {
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [openedAddresss, setOpenedAddresss] = useState<Address | undefined>(undefined);

    const { token, refreshTokens } = useAuth();
    const { t } = useTranslation();

    useEffect(() => {
        fetchAddresses().catch((error) => {
            console.error("Failed to fetch addresses", error);
        });
    }, [token]);

    const fetchAddresses = async () => {
        try{
            const fetchedAddresses = await addressService.GetAllByAuthenticatedUser(token!);
            setAddresses(fetchedAddresses);
        } catch (error) {
            if (error instanceof UnauthorizedError) {
                console.warn("Error fetching addresses: token expired, refreshing tokens");
                await refreshTokens()
                console.log("Tokens refreshed, retrying to fetch addresses");
                const fetchedAddresses = await addressService.GetAllByAuthenticatedUser(token!);
                setAddresses(fetchedAddresses);
            }
            else {
                console.error("Error fetching addresses:", error);
            }
        }
    };

    const handleUpdateAddress = async (address: Address) => {
        const command: UpdateAddressCommand = {
            adresId: address.adresId,
            street: address.street,
            houseNumber: address.houseNumber,
            postalCode: address.postalCode,
            villageName: address.villageName
        };

        try {
            const newAddress = await addressService.UpdateSingleAddress(command, token!);
            setAddresses((prevAddresses) =>
                prevAddresses.map((addr) =>
                    addr.adresId === newAddress.adresId ? newAddress : addr
                )
            );
        } catch (e) {
            if (e instanceof UnauthorizedError) {
                console.warn("Error updating address: token expired, refreshing tokens");
                await refreshTokens()
                const waiter = new Promise(resolve => setTimeout(resolve, 1000));
                await waiter;
                const newAddress = await addressService.UpdateSingleAddress(command, token!);
                setAddresses((prevAddresses) =>
                    prevAddresses.map((addr) =>
                        addr.adresId === newAddress.adresId ? newAddress : addr
                    )
                );
                console.log("Tokens refreshed, address updated");
            }
            else {
                console.error("Error updating address:", e);
            }
        }
    }

    return(
        <ScrollView
            className="flex-1 px-6"
            contentContainerStyle={{ paddingBottom: 100 }}
            showsVerticalScrollIndicator={false}
        >
            <SettingsHeader title={t("settings.addresses.title")} subtitle={t("settings.addresses.subtitle")} />

            {addresses.map((address) => (
                <AdressCard
                    key={address.adresId}
                    address={address}
                    isOpened={openedAddresss?.adresId === address.adresId}
                    startEditing={() => setOpenedAddresss(address)}
                    onChange={(updatedAddress) => {
                        setAddresses((prevAddresses) =>
                            prevAddresses.map((addr) =>
                                addr.adresId === updatedAddress.adresId ? updatedAddress : addr
                            )
                        );
                    }}
                    onClose={() => setOpenedAddresss(undefined)}
                    onSave={async (updatedAddress) => {
                        await handleUpdateAddress(updatedAddress);
                        setOpenedAddresss(undefined);
                    }}
                    onDelete={() => {
                        // Implement delete functionality if needed
                    }}
                    onCancel={() => {
                        // Reset changes if needed
                        setOpenedAddresss(undefined);
                    }}
                />
            ))}
        </ScrollView>
    )
}

export default AddressSettings;