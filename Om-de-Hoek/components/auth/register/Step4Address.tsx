import { useState, useEffect } from "react";
import { ScrollView, Text } from "react-native";
import { WrittenInput } from "@/components/WrittenInput";
import { PressableButton } from "@/components/PressableButton";
import { Color } from "@/types/StyleOptions";
import AuthHeader from "@/components/auth/AuthHeader";

export interface AddressData {
  streetName: string;
  houseNumber: string;
  municipality: string;
  postalCode: string;
}

type Props = {
  onNext: () => void;
  onChange: (data: AddressData) => void;
  onBack?: () => void;
};

export const Step4Address = ({ onNext, onChange, onBack }: Props) => {
  const [streetName, setStreetName] = useState<string>("");
  const [houseNumber, setHouseNumber] = useState<string>("");
  const [municipality, setMunicipality] = useState<string>("");
  const [postalCode, setPostalCode] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(false);

  useEffect(() => {
    const areFieldsFilled =
      streetName.length > 0 && municipality.length > 0 && postalCode.length > 0;

    const PostalCodeRegex = /^[1-9][0-9]{3}$/;
    const isPostalCodeValid = PostalCodeRegex.test(postalCode);

    const valid = areFieldsFilled && isPostalCodeValid;
    setIsValid(valid);

    if (valid) {
      onChange({ streetName, houseNumber, municipality, postalCode });
    }
  }, [streetName, houseNumber, municipality, postalCode]);

  return (
    <ScrollView
      className="flex-1 p-6"
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
    >
      <AuthHeader title={"maak een account aan"} onBack={onBack} />
      <Text className="text-[16px] text-black font-comfortaa-semibold text-center mb-2">
        Wat is uw adres?
      </Text>
      <Text className="text-[14px] text-gray text-center font-comfortaa-medium mb-10">
        Waar mogen we komen eten?
      </Text>

      <WrittenInput
        placeholder="Straatnaam"
        value={streetName}
        onChangeText={setStreetName}
        inputType="default"
      />

      <WrittenInput
        placeholder="Huisnummer (optioneel)"
        value={houseNumber}
        onChangeText={setHouseNumber}
        inputType="default"
      />

      <WrittenInput
        placeholder="Gemeente"
        value={municipality}
        onChangeText={setMunicipality}
        inputType="default"
      />

      <WrittenInput
        placeholder="Postcode"
        value={postalCode}
        onChangeText={setPostalCode}
        inputType="default"
      />

      <PressableButton
        onPress={async () => onNext()}
        disabled={!isValid}
        title="Verdergaan"
        background={isValid ? Color.BLUE : Color.GRAY}
      />
    </ScrollView>
  );
};
