import { useState, useEffect } from "react";
import { Text, View, Pressable, ScrollView } from "react-native";
import { WrittenInput } from "@/components/WrittenInput";
import { PressableButton } from "@/components/PressableButton";
import { Color } from "@/types/StyleOptions";
import { Eye, EyeClosed } from "lucide-react-native";
import { ValidationRow } from "@/components/ValidationRow";
import AuthHeader from "@/components/auth/AuthHeader";

type Props = {
  onNext: () => void;
  onChange: (password: string) => void;
  onBack?: () => void;
};

export const Step6Password = ({ onNext, onChange, onBack }: Props) => {
  const [password, setPassword] = useState<string>("");
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [hasMinLength, setHasMinLength] = useState<boolean>(false);
  const [hasNumber, setHasNumber] = useState<boolean>(false);
  const [hasUppercase, setHasUppercase] = useState<boolean>(false);
  const [hasSpecialChar, setHasSpecialChar] = useState<boolean>(false);
  const [isValid, setIsValid] = useState<boolean>(false);
  const [strength, setStrength] = useState<number>(0);

  useEffect(() => {
    const minLengthValid = password.length >= 8;
    const numberValid = /\d/.test(password);
    const uppercaseValid = /[A-Z]/.test(password);
    const specialCharValid = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/]/g.test(password);

    setHasMinLength(minLengthValid);
    setHasNumber(numberValid);
    setHasUppercase(uppercaseValid);
    setHasSpecialChar(specialCharValid);

    const overallValid =
      minLengthValid && numberValid && uppercaseValid && specialCharValid;
    setIsValid(overallValid);

    const score = [
      minLengthValid,
      numberValid,
      uppercaseValid,
      specialCharValid,
    ].filter(Boolean).length;
    setStrength(score);

    onChange(password);
  }, [password]);

  const getStrengthFeedback = () => {
    if (!password) return { text: "", color: "text-gray" };
    if (strength < 2) return { text: "Zwak", color: "text-red" };
    if (strength < 4) return { text: "Goed", color: "text-yellow-500" };
    return { text: "Sterk", color: "text-green-500" };
  };

  const strengthFeedback = getStrengthFeedback();

  return (
    <ScrollView
      className="flex-1 p-6"
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
    >
      <AuthHeader title={"maak een account aan"} onBack={onBack} />
      <Text className="text-[16px] text-black font-comfortaa-semibold text-center mb-2">
        Kies een veilig wachtwoord
      </Text>
      <Text className="text-[14px] text-gray text-center font-comfortaa-medium mb-10">
        Dat zelfs jij morgen nog probeert te onthouden.
      </Text>

      <View className="my-4">
        <View className="flex-row mb-2">
          <Text className="font-comfortaa-semibold">Wachtwoord Sterkte: </Text>
          <Text className={`font-comfortaa-bold ${strengthFeedback.color}`}>
            {strengthFeedback.text}
          </Text>
        </View>

        <ValidationRow isValid={hasMinLength} text="Minstens 8 karakters" />
        <ValidationRow isValid={hasNumber} text="Minstens één cijfer" />
        <ValidationRow isValid={hasUppercase} text="Minstens één hoofdletter" />
        <ValidationRow
          isValid={hasSpecialChar}
          text="Minstens één speciaal karakter"
        />
      </View>

      <View className="relative justify-center">
        <WrittenInput
          placeholder="Wachtwoord"
          value={password}
          onChangeText={setPassword}
          inputType="password"
          secureTextEntry={!isPasswordVisible}
        />

        <Pressable
          onPress={() => setIsPasswordVisible(!isPasswordVisible)}
          className="absolute right-4 justify-center mb-4"
        >
          {isPasswordVisible ? (
            <EyeClosed size={20} color="gray" />
          ) : (
            <Eye size={20} color="gray" />
          )}
        </Pressable>
      </View>

      <PressableButton
        onPress={async () => onNext()}
        disabled={!isValid}
        title="Verdergaan"
        background={isValid ? Color.BLUE : Color.GRAY}
      />
    </ScrollView>
  );
};
