import { useState, useEffect, useRef } from "react";
import { ScrollView, Text, View } from "react-native";
import PhoneInput from "react-native-phone-number-input";
import { PressableButton } from "@/components/PressableButton";
import { Color } from "@/types/StyleOptions";
import AuthHeader from "@/components/auth/AuthHeader";

type Props = {
  onNext: () => void;
  onChange: (formattedPhoneNumber: string) => void;
};

export const Step5PhoneNumber = ({ onNext, onChange }: Props) => {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [formattedValue, setFormattedValue] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(false);

  const phoneInputRef = useRef<PhoneInput>(null);
  const lastAllowedRef = useRef<string>("");

  useEffect(() => {
    const digits = phoneNumber.replace(/\D/g, "");

    if (digits.length === 9) {
      setIsValid(true);
      onChange(formattedValue || phoneNumber);
    } else {
      setIsValid(false);
      onChange("");
    }
  }, [phoneNumber, formattedValue]);

  return (
    <ScrollView
      className="flex-1 p-6"
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
    >
      <AuthHeader title={"maak een account aan"} />
      <Text className="text-[16px] text-black font-comfortaa-semibold text-center mb-2">
        Wat is uw telefoonnummer?
      </Text>
      <Text className="text-[14px] text-gray text-center font-comfortaa-medium mb-10">
        Waar kan men je in geval van nood bereiken?
      </Text>

      <PhoneInput
        ref={phoneInputRef}
        value={phoneNumber}
        defaultCode="BE"
        layout="second"
        onChangeText={(text) => {
          const digits = text.replace(/\D/g, "");
          if (digits.length > 9) {
            return;
          }
          lastAllowedRef.current = text;
          setPhoneNumber(text);
        }}
        onChangeFormattedText={(text) => {
          const digits = text.replace(/\D/g, "");
          if (digits.length > 9) {
            return;
          }
          setFormattedValue(text);
        }}
        withDarkTheme={false}
        withShadow={false}
        autoFocus={false}
        containerStyle={{
          width: "100%",
          borderColor: "#D1D5DB",
          borderWidth: 1,
          borderRadius: 8,
          marginBottom: 8,
          backgroundColor: "transparent",
          padding: 0,
        }}
        textContainerStyle={{
          backgroundColor: "transparent",
          paddingVertical: 0,
          paddingHorizontal: 0,
          height: 50,
        }}
        textInputStyle={{
          width: "100%",
          height: 50,
          paddingVertical: 12,
          paddingHorizontal: 16,
          fontFamily: "comfortaa-regular",
          fontSize: 16,
          color: "black",
        }}
        codeTextStyle={{
          fontFamily: "comfortaa-regular",
          height: 50,
          lineHeight: 50,
          fontSize: 16,
          color: "black",
        }}
        countryPickerButtonStyle={{
          width: 80,
          justifyContent: "center",
          alignItems: "center",
        }}
        textInputProps={{ placeholderTextColor: "#9CA3AF" }}
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
