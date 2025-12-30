import { Alert, Pressable, Text, TouchableOpacity, View } from "react-native";
import { Address } from "@/types/address";
import { ChevronRight, Trash } from "lucide-react-native";
import { useState } from "react";
import LabeledInput from "@/components/settings/LabeledInput";
import { useTranslation } from "react-i18next";
import { Color } from "@/types/StyleOptions";

type Props = {
  address: Address;
  isOpened: boolean;
  startEditing?: () => void;
  onChange?: (address: Address) => void;
  onSave?: (address: Address) => void;
  onDelete?: () => void;
  onCancel?: () => void;
};

const AdressCard = ({
  address,
  isOpened,
  startEditing,
  onChange,
  onSave,
  onCancel,
  onDelete,
}: Props) => {
  const [updatedAddress, setUpdatedAddress] = useState<Address>({ ...address });
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const { t } = useTranslation();

  const updateField = (field: keyof Address, value: string) => {
    const newAddress = { ...updatedAddress, [field]: value };
    setUpdatedAddress(newAddress);
    if (onChange) onChange(newAddress);
  };

  const save = () => {
    if (onSave) onSave(updatedAddress);
  };

  const onCancelEditing = () => {
    setUpdatedAddress({ ...address });
    if (onCancel) onCancel();
  };

  const handleDeleteWithConfirmation = () => {
    if (!onDelete) return;

    Alert.alert(t("common.sure"), t("common.addressConfirmation"), [
      {
        text: t("common.cancel"),
        style: "cancel",
      },
      {
        text: t("common.delete"),
        style: "destructive",
        onPress: () => {
          onDelete();
        },
      },
    ]);
  };

  return (
    <View
      className="mx-2 my-2 rounded-xl bg-white shadow-sm"
      style={{
        elevation: 2,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
      }}
    >
      {isOpened ? (
        <View className="p-4">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-lg font-comfortaa-bold  text-black">
              {t("register.address.edit")}
            </Text>
            {onDelete && (
              <TouchableOpacity
                onPress={handleDeleteWithConfirmation}
                className="p-2"
              >
                <Trash size={20} color={Color.RED} />
              </TouchableOpacity>
            )}
          </View>
          <View className="flex-col gap-3">
            <View className="flex-row gap-3">
              <View className="flex-1">
                <LabeledInput
                  value={updatedAddress.street}
                  onChange={(text) => updateField("street", text)}
                  label={t("register.address.mandatoryStreet")}
                  onFocus={() => setFocusedField("street")}
                  onBlur={() => setFocusedField(null)}
                  isFocused={focusedField === "street"}
                />
              </View>
              <View className="w-1/3">
                <LabeledInput
                  value={updatedAddress.houseNumber ?? ""}
                  onChange={(text) => updateField("houseNumber", text)}
                  label={t("register.address.housenumber")}
                  onFocus={() => setFocusedField("houseNumber")}
                  onBlur={() => setFocusedField(null)}
                  isFocused={focusedField === "houseNumber"}
                />
              </View>
            </View>

            <View className="flex-row gap-3">
              <View className="w-1/3">
                <LabeledInput
                  value={updatedAddress.postalCode}
                  onChange={(text) => updateField("postalCode", text)}
                  label={t("register.address.mandatoryPostalcode")}
                  onFocus={() => setFocusedField("postalCode")}
                  onBlur={() => setFocusedField(null)}
                  isFocused={focusedField === "postalCode"}
                />
              </View>
              <View className="flex-1">
                <LabeledInput
                  value={updatedAddress.villageName}
                  onChange={(text) => updateField("villageName", text)}
                  label={t("register.address.mandatoryMunicipality")}
                  onFocus={() => setFocusedField("villageName")}
                  onBlur={() => setFocusedField(null)}
                  isFocused={focusedField === "villageName"}
                />
              </View>
            </View>
          </View>

          <View className="flex-row justify-end items-center gap-4 mt-6">
            {onCancel && (
              <Pressable onPress={onCancelEditing} className="px-4 py-2">
                <Text className="font-comfortaa-semibold text-gray-500">
                  {t("common.cancel")}
                </Text>
              </Pressable>
            )}

            {onSave && (
              <Pressable
                onPress={save}
                style={{ backgroundColor: Color.BLUE }}
                className="px-6 py-2.5 rounded-full shadow-sm"
              >
                <Text className="font-comfortaa-bold text-white text-center">
                  {t("common.save")}
                </Text>
              </Pressable>
            )}
          </View>
        </View>
      ) : (
        <TouchableOpacity
          onPress={startEditing}
          className="p-4 flex-row justify-between items-center"
        >
          <View className="flex-col">
            <Text className="text-black font-comfortaa-bold text-base">
              {address.street} {address.houseNumber}
            </Text>
            <Text className="text-gray font-comfortaa-semibold text-md">
              {address.postalCode} {address.villageName}
            </Text>
          </View>
          <ChevronRight size={20} color="#CBD5E1" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default AdressCard;
