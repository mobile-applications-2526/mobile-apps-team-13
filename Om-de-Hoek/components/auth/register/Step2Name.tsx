import React, {useState} from "react";
import {Text, View} from "react-native";
import {PressableButton} from "@/components/PressableButton";
import {Color} from "@/types/StyleOptions";
import AuthHeader from "@/components/auth/AuthHeader";
import {useTranslation} from "react-i18next";
import LabeledInput from "@/components/settings/LabeledInput";

type Props = {
  onNext: () => void;
  onChange: (name: { firstName: string; lastName: string }) => void;
  onBack?: () => void;
  firstName?: string;
  lastName?: string;
};

export const Step2Name = ({
  onNext,
  onChange,
  onBack,
  firstName: firstNameProp,
  lastName: lastNameProp,
}: Props) => {
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const { t } = useTranslation();

  const first = firstNameProp ?? "";
  const last = lastNameProp ?? "";
  const isValid = first.length > 0 && last.length > 0;

  const handleFirstChange = (text: string) => {
    onChange({ firstName: text, lastName: last });
  };

  const handleLastChange = (text: string) => {
    onChange({ firstName: first, lastName: text });
  };

  return (
    <View className="flex-1 justify-center">
      <AuthHeader title={"maak een account aan"} onBack={onBack} />
      <Text className="text-[16px] text-black font-comfortaa-semibold text-center mb-2">
        {t("register.name.title")}
      </Text>
      <Text className="text-[14px] text-gray text-center font-comfortaa-medium mb-10">
        {t("register.name.subtitle")}
      </Text>

      <LabeledInput
        label={t("register.name.firstname")}
        value={first}
        onChange={handleFirstChange}
        keyboardType="default"
        isFocused={focusedField === "firstName"}
        onFocus={() => setFocusedField("firstName")}
        onBlur={() => setFocusedField(null)}
        placeholder={t("register.name.firstname")}
      />

      <LabeledInput
        label={t("register.name.lastname")}
        value={last}
        onChange={handleLastChange}
        keyboardType="default"
        isFocused={focusedField === "lastName"}
        onFocus={() => setFocusedField("lastName")}
        onBlur={() => setFocusedField(null)}
        placeholder={t("register.name.lastname")}
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
