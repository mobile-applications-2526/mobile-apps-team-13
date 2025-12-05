import { useMemo } from "react";
import { ScrollView, Text } from "react-native";
import { WrittenInput } from "@/components/WrittenInput";
import { PressableButton } from "@/components/PressableButton";
import { Color } from "@/types/StyleOptions";
import AuthHeader from "@/components/auth/AuthHeader";
import { useTranslation } from "react-i18next";

type Props = {
  onNext: () => void;
  onChange: (email: string) => void;
  value: string;
  onBack?: () => void;
};

export const Step1Email = ({ onNext, onChange, value, onBack }: Props) => {
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
    <ScrollView
      className="flex-1 p-6"
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
    >
      <AuthHeader title={"maak een account aan"} onBack={onBack} />
      <Text className="text-[16px] text-black font-comfortaa-semibold text-center mb-2">
        {t('register.email.title')}
      </Text>
      <Text className="text-[14px] text-gray text-center font-comfortaa-medium mb-10">
        {t('register.email.subtitle')}
      </Text>

      <WrittenInput
        placeholder={t('register.email.email')}
        value={value}
        onChangeText={handleEmailChange}
        inputType="email-address"
      />

      <PressableButton
        onPress={async () => onNext()}
        disabled={!isValid}
        title={t('register.continue')}
        background={isValid ? Color.BLUE : Color.GRAY}
      />
    </ScrollView>
  );
};
