import { useMemo, useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, Text } from "react-native";
import { PressableButton } from "@/components/PressableButton";
import { Color } from "@/types/StyleOptions";
import AuthHeader from "@/components/auth/AuthHeader";
import { useTranslation } from "react-i18next";
import LabeledInput from "@/components/settings/LabeledInput";

type Props = {
  onNext: () => void;
  onChange: (email: string) => void;
  value: string;
  onBack?: () => void;
};

export const Step1Email = ({ onNext, onChange, value, onBack }: Props) => {
  const [isFocused, setIsFocused] = useState(false);
  const { t } = useTranslation();

  const isValid = useMemo(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(("" + (value || "")).toLowerCase());
  }, [value]);

  const handleEmailChange = (text: string) => {
    const loweredText = text.toLowerCase();
    onChange(loweredText);
  };

  return (
    <KeyboardAvoidingView className="flex-1 justify-center">
      <AuthHeader title={"maak een account aan"} onBack={onBack} />
      <Text className="text-[16px] text-black font-comfortaa-semibold text-center mb-2">
        {t("register.email.title")}
      </Text>
      <Text className="text-[14px] text-gray text-center font-comfortaa-medium mb-10">
        {t("register.email.subtitle")}
      </Text>

      <LabeledInput
        label={t("register.email.email")}
        value={value}
        onChange={handleEmailChange}
        keyboardType="email-address"
        isFocused={isFocused}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={t("register.email.email")}
      />

      <PressableButton
        onPress={async () => onNext()}
        disabled={!isValid}
        title={t("register.continue")}
        background={isValid ? Color.BLUE : Color.GRAY}
      />
    </KeyboardAvoidingView>
  );
};
