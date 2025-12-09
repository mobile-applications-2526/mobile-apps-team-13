import { useRef } from "react";
import { ScrollView, Text } from "react-native";
import PhoneInput from "react-native-phone-number-input";
import { PressableButton } from "@/components/PressableButton";
import { Color } from "@/types/StyleOptions";
import AuthHeader from "@/components/auth/AuthHeader";
import { useTranslation } from "react-i18next";

type Props = {
  onNext: () => void;
  onChange: (formattedPhoneNumber: string) => void;
  onBack?: () => void;
  value?: string;
};

export const Step5PhoneNumber = ({
  onNext,
  onChange,
  onBack,
  value,
}: Props) => {
  const { t } = useTranslation();

  const phone = value ?? "";

  const phoneInputRef = useRef<PhoneInput>(null);

  const digitsFrom = (text: string) => text.replace(/\D/g, "");
  const digits = digitsFrom(phone);
  const isValid = digits.length === 9;

  return (
    <ScrollView
      className="flex-1 p-6"
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
    >
      <AuthHeader title={"maak een account aan"} onBack={onBack} />
      <Text className="text-[16px] text-black font-comfortaa-semibold text-center mb-2">
        {t("register.phone.title")}
      </Text>
      <Text className="text-[14px] text-gray text-center font-comfortaa-medium mb-10">
        {t("register.phone.subtitle")}
      </Text>

      <PhoneInput
        ref={phoneInputRef}
        value={phone}
        defaultCode="BE"
        layout="second"
        placeholder={t("register.phone.phone")}
        countryPickerProps={{
          filterProps: {
            placeholder: t("register.phone.country"),
          },
        }}
        onChangeText={(text) => {
          const d = digitsFrom(text);
          if (d.length > 9) return;
          onChange(text);
        }}
        onChangeFormattedText={(text) => {
          const d = digitsFrom(text);
          if (d.length > 9) return;
          onChange(text);
        }}
        withDarkTheme={false}
        withShadow={false}
        autoFocus={false}
        containerStyle={{
          width: "100%",
          borderColor: "gray",
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
        title={t("register.continue")}
        background={isValid ? Color.BLUE : Color.GRAY}
      />
    </ScrollView>
  );
};
