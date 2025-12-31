import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { PressableButton } from "@/components/PressableButton";
import { Color } from "@/types/StyleOptions";
import { Eye, EyeClosed } from "lucide-react-native";
import { ValidationRow } from "@/components/ValidationRow";
import AuthHeader from "@/components/auth/AuthHeader";
import { useTranslation } from "react-i18next";
import LabeledInput from "@/components/settings/LabeledInput";

type Props = {
  onNext: () => void;
  onChange: (password: string) => void;
  onBack?: () => void;
  password?: string;
};

export const Step6Password = ({
  onNext,
  onChange,
  onBack,
  password: passwordProp,
}: Props) => {
  const [password, setPassword] = useState<string>(passwordProp ?? "");
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [hasMinLength, setHasMinLength] = useState<boolean>(false);
  const [hasNumber, setHasNumber] = useState<boolean>(false);
  const [hasUppercase, setHasUppercase] = useState<boolean>(false);
  const [hasSpecialChar, setHasSpecialChar] = useState<boolean>(false);
  const [isValid, setIsValid] = useState<boolean>(false);
  const [strength, setStrength] = useState<number>(0);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [hasLowercase, setHasLowercase] = useState<boolean>(false);
  const [maxScore, setMaxScore] = useState<number>(0);

  const { t } = useTranslation();

  useEffect(() => {
    if (passwordProp !== undefined && passwordProp !== password) {
      setPassword(passwordProp);
    }
  }, [passwordProp]);

  useEffect(() => {
    const minLengthValid = password.length >= 8;
    const numberValid = /\d/.test(password);
    const uppercaseValid = /[A-Z]/.test(password);
    const specialCharValid = /[\p{P}\p{S}]/u.test(password);
    const lowerCaseValid = /[a-z]/.test(password);

    setHasMinLength(minLengthValid);
    setHasNumber(numberValid);
    setHasUppercase(uppercaseValid);
    setHasSpecialChar(specialCharValid);
    setHasLowercase(lowerCaseValid);

    const overallValid =
      minLengthValid && numberValid && uppercaseValid && specialCharValid;
    setIsValid(overallValid);

    const requirements = [
      minLengthValid,
      numberValid,
      uppercaseValid,
      specialCharValid,
      lowerCaseValid,
    ];

    const score = requirements.filter(Boolean).length;
    setStrength(score);

    setMaxScore(requirements.length);
  }, [password]);

  const getStrengthFeedback = () => {
    if (!password) return { text: "", color: "text-gray" };
    if (strength < Math.ceil(maxScore / 2))
      return { text: t("register.password.weak"), color: "text-red" };
    if (strength < maxScore)
      return { text: t("register.password.good"), color: "text-yellow-500" };
    return { text: t("register.password.strong"), color: "text-green-500" };
  };

  const strengthFeedback = getStrengthFeedback();

  return (
    <View className="flex-1 justify-center">
      <AuthHeader title={"maak een account aan"} onBack={onBack} />
      <Text className="text-[16px] text-black font-comfortaa-semibold text-center mb-2">
        {t("register.password.title")}
      </Text>
      <Text className="text-[14px] text-gray text-center font-comfortaa-medium mb-10">
        {t("register.password.subtitle")}
      </Text>

      <View className="my-4">
        <View className="flex-row mb-2">
          <Text className="font-comfortaa-semibold">
            {t("register.password.passwordstrong")}
          </Text>
          <Text className={`font-comfortaa-bold ${strengthFeedback.color}`}>
            {strengthFeedback.text}
          </Text>
        </View>

        <ValidationRow
          isValid={hasMinLength}
          text={t("register.password.characters")}
        />
        <ValidationRow
          isValid={hasNumber}
          text={t("register.password.number")}
        />
        <ValidationRow
          isValid={hasUppercase}
          text={t("register.password.uppercase")}
        />
        <ValidationRow
          isValid={hasSpecialChar}
          text={t("register.password.special")}
        />
        <ValidationRow
          isValid={hasLowercase}
          text={t("register.password.lowercase")}
        />
      </View>

      <View className="relative justify-center">
        <LabeledInput
          label={t("register.password.mandatoryPassword")}
          value={password}
          onChange={(text) => {
            setPassword(text);
            onChange(text);
          }}
          editable={true}
          isFocused={isFocused}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          keyboardType="default"
          placeholder={t("register.password.password")}
          secureTextEntry={!isPasswordVisible}
          autoCapitalize="none"
          rightIcon={
            <Pressable onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
              {isPasswordVisible ? (
                <EyeClosed size={20} color="#828282" />
              ) : (
                <Eye size={20} color="#828282" />
              )}
            </Pressable>
          }
        />
      </View>

      <PressableButton
        onPress={async () => onNext()}
        disabled={!isValid}
        title={t("register.continue")}
        background={isValid ? Color.BLUE : Color.GRAY}
      />
    </View>
  );
};
