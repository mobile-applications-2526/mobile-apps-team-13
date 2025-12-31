import { useEffect, useState } from "react";
import {
  Address,
  CreateAddressCommand,
  UpdateAddressCommand,
} from "@/types/address";
import addressService from "@/services/addressService";
import { useAuth } from "@/components/auth/context/AuthContext";
import AdressCard from "@/components/card/AdressCard";
import SettingsHeader from "@/components/settings/SettingsHeader";
import { useTranslation } from "react-i18next";
import { UnauthorizedError } from "@/types/Errors/UnauthorizedError";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import FloatingActionButton from "@/components/FloatingActionButton";
import { MapPin, Plus } from "lucide-react-native";
import { Color } from "@/types/StyleOptions";
import { Text } from "react-native";
import EmptyState from "@/components/EmptyState";

const AddressSettings = () => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [openedAddresss, setOpenedAddresss] = useState<Address | undefined>(
    undefined
  );
  const [addingNew, setAddingNew] = useState<boolean>(false);
  const [newAddress, setNewAddress] = useState<CreateAddressCommand>({
    street: "",
    houseNumber: "",
    postalCode: "",
  } as CreateAddressCommand);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { token, refreshTokens } = useAuth();
  const { t } = useTranslation();

  useEffect(() => {
    fetchAddresses().catch((error) => {
      console.error("Failed to fetch addresses", error);
    });
  }, [token]);

  const fetchAddresses = async () => {
    try {
      const fetchedAddresses = await addressService.GetAllByAuthenticatedUser(
        token!
      );
      setAddresses(fetchedAddresses);
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        console.warn(
          "Error fetching addresses: token expired, refreshing tokens"
        );
        await refreshTokens();
        console.log("Tokens refreshed, retrying to fetch addresses");
        const fetchedAddresses = await addressService.GetAllByAuthenticatedUser(
          token!
        );
        setAddresses(fetchedAddresses);
      } else {
        console.error("Error fetching addresses:", error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateAddress = async (address: Address) => {
    const command: UpdateAddressCommand = {
      adresId: address.adresId,
      street: address.street,
      houseNumber: address.houseNumber,
      postalCode: address.postalCode,
      villageName: address.villageName,
    };

    try {
      const newAddress = await addressService.UpdateSingleAddress(
        command,
        token!
      );
      setAddresses((prevAddresses) =>
        prevAddresses.map((addr) =>
          addr.adresId === newAddress.adresId ? newAddress : addr
        )
      );
    } catch (e) {
      if (e instanceof UnauthorizedError) {
        console.warn(
          "Error updating address: token expired, refreshing tokens"
        );
        await refreshTokens();
        const waiter = new Promise((resolve) => setTimeout(resolve, 1000));
        await waiter;
        const newAddress = await addressService.UpdateSingleAddress(
          command,
          token!
        );
        setAddresses((prevAddresses) =>
          prevAddresses.map((addr) =>
            addr.adresId === newAddress.adresId ? newAddress : addr
          )
        );
        console.log("Tokens refreshed, address updated");
      } else {
        console.error("Error updating address:", e);
      }
    }
  };

  const handleDeleteAddress = async (addressId: string) => {
    try {
      await addressService.DeleteAddress(addressId, token!);
      setAddresses((prevAddresses) =>
        prevAddresses.filter((addr) => addr.adresId !== addressId)
      );
    } catch (e) {
      if (e instanceof UnauthorizedError) {
        console.warn(
          "Error deleting address: token expired, refreshing tokens"
        );
        await refreshTokens();
        const waiter = new Promise((resolve) => setTimeout(resolve, 1000));
        await waiter;
        await addressService.DeleteAddress(addressId, token!);
        setAddresses((prevAddresses) =>
          prevAddresses.filter((addr) => addr.adresId !== addressId)
        );
        console.log("Tokens refreshed, address deleted");
      } else {
        console.error("Error deleting address:", e);
      }
    }
  };

  const handleChangeNew = (updatedAddress: Address) => {
    setNewAddress({
      street: updatedAddress.street,
      houseNumber: updatedAddress.houseNumber,
      postalCode: updatedAddress.postalCode,
    });
  };

  const saveNew = async (updatedAddress: Address) => {
    const command: CreateAddressCommand = {
      street: updatedAddress.street,
      houseNumber: updatedAddress.houseNumber,
      postalCode: updatedAddress.postalCode,
    };
    try {
      const createdAddress = await addressService.RegisterAddress(
        command,
        token!
      );
      setAddresses((prevAddresses) => [...prevAddresses, createdAddress]);
      setAddingNew(false);
      setNewAddress({
        street: "",
        houseNumber: "",
        postalCode: "",
      } as CreateAddressCommand);
    } catch (e) {
      if (e instanceof UnauthorizedError) {
        console.warn(
          "Error creating address: token expired, refreshing tokens"
        );
        await refreshTokens();
        const waiter = new Promise((resolve) => setTimeout(resolve, 1000));
        await waiter;
        const createdAddress = await addressService.RegisterAddress(
          command,
          token!
        );
        setAddresses((prevAddresses) => [...prevAddresses, createdAddress]);
        setAddingNew(false);
        setNewAddress({
          street: "",
          houseNumber: "",
          postalCode: "",
        } as CreateAddressCommand);
        console.log("Tokens refreshed, address created");
      } else {
        console.error("Error creating address:", e);
      }
    }
  };

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1, backgroundColor: Color.WHITE }}
      contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 100 }}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      enableOnAndroid={true}
      extraScrollHeight={115}
    >
      <SettingsHeader
        title={t("settings.addresses.title")}
        subtitle={t("settings.addresses.subtitle")}
      />

      {addresses.length === 0 && !addingNew && !isLoading && (
        <EmptyState
          title={t("settings.addresses.empty.title")}
          message={t("settings.addresses.empty.message")}
          icon={<MapPin size={48} color="#9CA3AF" />}
          actionLabel={t("settings.addresses.empty.action")}
          onAction={async () => setAddingNew(true)}
        />
      )}

      {addresses.map((address) => (
        <AdressCard
          key={address.adresId}
          address={address}
          isOpened={openedAddresss?.adresId === address.adresId}
          startEditing={() => setOpenedAddresss(address)}
          onSave={async (updatedAddress) => {
            await handleUpdateAddress(updatedAddress);
            setOpenedAddresss(undefined);
          }}
          onDelete={() => {
            handleDeleteAddress(address.adresId).then();
          }}
          onCancel={() => {
            setOpenedAddresss(undefined);
          }}
        />
      ))}
      {!addingNew && addresses.length > 0 && (
        <FloatingActionButton
          icon={<Plus color="white" size={28} strokeWidth={2.5} />}
          onPress={() => setAddingNew(true)}
          isLoading={isLoading}
        />
      )}
      {addingNew && (
        <AdressCard
          address={newAddress as Address}
          isOpened={true}
          onChange={handleChangeNew}
          onSave={saveNew}
          onCancel={() => {
            setAddingNew(false);
            setNewAddress({
              street: "",
              houseNumber: "",
              postalCode: "",
            } as CreateAddressCommand);
          }}
        />
      )}
    </KeyboardAwareScrollView>
  );
};

export default AddressSettings;
