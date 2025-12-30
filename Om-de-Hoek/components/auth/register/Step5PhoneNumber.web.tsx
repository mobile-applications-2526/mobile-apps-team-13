import { useState } from "react";
import { Text, View } from "react-native";
import { PressableButton } from "@/components/PressableButton";
import { Color } from "@/types/StyleOptions";
import AuthHeader from "@/components/auth/AuthHeader";
import { useTranslation } from "react-i18next";
import LabeledInput from "@/components/settings/LabeledInput";

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
  const [isFocused, setIsFocused] = useState(false);

  const phone = value ?? "";
  const digitsFrom = (text: string) => text.replace(/\D/g, "");
  const digits = digitsFrom(phone);
  const isValid = digits.length >= 9;

  return (
    <View className="flex-1 justify-center">
      <AuthHeader title={"maak een account aan"} onBack={onBack} />
      <Text className="text-[16px] text-black font-comfortaa-semibold text-center mb-2">
        {t("register.phone.title")}
      </Text>
      <Text className="text-[14px] text-gray text-center font-comfortaa-medium mb-10">
        {t("register.phone.subtitle")}
      </Text>

      <LabeledInput
        label={t("register.phone.label")}
        value={phone}
        onChange={onChange}
        keyboardType="phone-pad"
        isFocused={isFocused}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={t("register.phone.placeholder")}
      />

      <PressableButton
        onPress={async () => onNext()}
        disabled={!isValid}
        title={t("register.continue")}
        background={isValid ? Color.BLUE : Color.GRAY}
      />
    </View>
  );
};