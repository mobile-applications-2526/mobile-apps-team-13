import { useState, useEffect } from "react";
import { Text, ScrollView } from "react-native";
import { WrittenInput } from "@/components/WrittenInput";
import { PressableButton } from "@/components/PressableButton";
import { Color } from "@/types/StyleOptions";
import AuthHeader from "@/components/auth/AuthHeader";
import { useTranslation } from "react-i18next";

type Props = {
  onNext: () => void;
  onChange: (name: { firstName: string; lastName: string }) => void;
  onBack?: () => void;
};

export const Step2Name = ({ onNext, onChange, onBack }: Props) => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [isValid, setValid] = useState<boolean>(false);

  const { t } = useTranslation();

  useEffect(() => {
    const valid = firstName.length > 0 && lastName.length > 0;
    setValid(valid);

    onChange({ firstName, lastName });
  }, [firstName, lastName]);

  return (
    <ScrollView
      className="flex-1 p-6"
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
    >
      <AuthHeader title={"maak een account aan"} onBack={onBack} />
      <Text className="text-[16px] text-black font-comfortaa-semibold text-center mb-2">
        {t("register.name.title")}
      </Text>
      <Text className="text-[14px] text-gray text-center font-comfortaa-medium mb-10">
        {t("register.name.subtitle")}
      </Text>

      <WrittenInput
        placeholder={t("register.name.firstname")}
        value={firstName}
        onChangeText={setFirstName}
        inputType="default"
      />

      <WrittenInput
        placeholder={t("register.name.lastname")}
        value={lastName}
        onChangeText={setLastName}
        inputType="default"
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
