import {GestureResponderEvent, KeyboardAvoidingView, Platform, Pressable, Text, View} from "react-native"
import {Address} from "@/types/address";
import {Save, SquarePen, Trash, Undo} from "lucide-react-native";
import {useState} from "react";
import LabeledInput from "@/components/settings/LabeledInput";
import {useTranslation} from "react-i18next";
import {Color} from "@/types/StyleOptions";

type Props = {
    address: Address,
    isOpened: boolean,
    startEditing: () => void,
    onChange: (address: Address) => void,
    onClose: () => void,
    onSave: (address: Address) => void,
    onDelete: () => void,
    onCancel: () => void,
}

const AdressCard = ({
                        address,
                        isOpened,
                        startEditing,
                        onChange,
                        onSave,
                        onCancel,
                        onDelete} : Props) => {
    const [updatedAddress, setUpdatedAddress] = useState<Address>({...address});
    const [bgEditButton, setBgEditButton] =  useState("#66666600");

    const { t } = useTranslation();

    const onStartEditing = () => {
        setBgEditButton('#0080ff20');

        startEditing();

        setTimeout(() => {
            setBgEditButton('#66666600');
        }, 100);
    }

    const handleChangeStreet = (text: string) => {
        const newAddress = {...updatedAddress, street: text};
        setUpdatedAddress(newAddress);
        onChange(newAddress);
    }

    const handleChangeNumber = (text: string) => {
        const newAddress = {...updatedAddress, houseNumber: text};
        setUpdatedAddress(newAddress);
        onChange(newAddress);
    }

    const handleChangePostalCode = (text: string) => {
        const newAddress = {...updatedAddress, postalCode: text};
        setUpdatedAddress(newAddress);
        onChange(newAddress);
    }

    const handleChangeCity = (text: string) => {
        const newAddress = {...updatedAddress, villageName: text};
        setUpdatedAddress(newAddress);
        onChange(newAddress);
    }

    const save = () => {
        onSave(updatedAddress);
    }

    const handleDelete = () => {
        onDelete();
    }

    const onCancelEditing = () => {
        setUpdatedAddress({...address});
        onCancel();
    }

    return(
        <View
            className="mx-2 my-2 rounded-lg bg-white px-2 py-3 shadow-sm"
            style={{
                shadowColor: "#000",
                shadowOpacity: 0.08,
                shadowRadius: 3,
                shadowOffset: { width: 0, height: 1 },
                elevation: 2,
            }}
        >
            {isOpened && (
                <KeyboardAvoidingView
                    className="flex-col gap-2 p-2"
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                >
                    <LabeledInput value={updatedAddress.street} onChange={handleChangeStreet} label={t("register.address.street")} />
                    <LabeledInput value={updatedAddress.houseNumber ?? ""} onChange={handleChangeNumber} label={t("register.address.housenumber")} />
                    <LabeledInput value={updatedAddress.postalCode} onChange={handleChangePostalCode} label={t("register.address.postalcode")} />
                    <LabeledInput value={updatedAddress.villageName} onChange={handleChangeCity} label={t("register.address.municipality")} />

                    <View
                        className="flex-row gap-4 justify-between mt-2"
                    >
                        <Pressable
                            onPress={handleDelete}
                            style={{
                                backgroundColor: Color.WHITE,
                                padding: 8,
                                borderRadius: 8,
                                borderColor: Color.RED,
                                borderWidth: 1,
                            }}
                            className="flex-col gap-2 items-center"
                        >
                            <Trash size={16} color={Color.RED} />
                            <Text className="font-comfortaa-semibold text-xs text-gray">{t("common.delete")}</Text>
                        </Pressable>

                        <Pressable
                            onPress={onCancelEditing}
                            style={{
                                backgroundColor: Color.WHITE,
                                padding: 8,
                                borderRadius: 8,
                                borderColor: Color.GRAY,
                                borderWidth: 1,
                            }}
                            className="flex-col gap-2 items-center"
                        >
                            <Undo size={16} color={Color.BLUE} />
                            <Text className="font-comfortaa-semibold text-xs text-gray">{t("common.cancel")}</Text>
                        </Pressable>

                        <Pressable
                            onPress={save}
                            style={{
                                backgroundColor: Color.WHITE,
                                padding: 8,
                                borderRadius: 8,
                                borderColor: Color.GREEN,
                                borderWidth: 1,
                            }}
                            className="flex-col gap-2 items-center"
                        >
                            <Save size={16} color={Color.GREEN} />
                            <Text className="font-comfortaa-semibold text-xs text-gray">{t("common.save")}</Text>
                        </Pressable>
                    </View>

                </KeyboardAvoidingView>
            )}
            {!isOpened && (
                <View
                    className="flex-row gap-2 justify-between items-center"
                >
                    <Text>
                        {address.fullAdress}
                    </Text>

                    <View
                        className="flex-row gap-4"
                    >
                        <Pressable
                            onPress={onStartEditing}
                            style={{
                                backgroundColor: bgEditButton,
                                padding: 8,
                                borderRadius: 8,
                            }}
                        >
                            <SquarePen size={16} color="#2548BC" />
                        </Pressable>
                    </View>
                </View>
            )}
        </View>
    )
}

export default AdressCard;