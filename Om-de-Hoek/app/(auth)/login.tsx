import {Pressable, Text, View} from "react-native";
import React, {useState} from "react";
import {LoginBody} from "@/types/auth";
import {useAuth} from "@/components/auth/context/AuthContext";
import {Href, router} from "expo-router";
import authService from "@/services/authService";
import {CustomError} from "@/types/Errors/CustomError";
import AuthHeader from "@/components/auth/AuthHeader";
import {PressableButton} from "@/components/PressableButton";
import {Color} from "@/types/StyleOptions";
import InputPageView from "@/components/InputPageView";
import {useTranslation} from "react-i18next";
import LabeledInput from "@/components/settings/LabeledInput";
import {Eye, EyeClosed} from "lucide-react-native";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const references = {
  registerPage: "/(auth)/register",
};

export default function LoginPage() {
  const [credentials, setCredentials] = useState<LoginBody>({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const { t } = useTranslation();

  const { signIn } = useAuth();

  const errorMessages = {
    invalidCredentials: t("login.error.invalidcredentials"),
    invalidEmail: t("login.error.invalidemail"),
    empty: t("login.error.empty"),
  };

  const goToRegister = async () => {
    const href = references.registerPage as Href;
    router.navigate(href);
  };

  const handleLogin = async () => {
    if (!validate()) {
      return;
    }

    try {
      const loginResponse = await authService.authLogin(credentials);
      await signIn(loginResponse.token, loginResponse.refreshToken);
    } catch (error) {
      if (error instanceof CustomError) {
        setErrorMessage(errorMessages.invalidCredentials);
      }
    }
  };

  const handleEmailChange = (text: string) => {
    setCredentials((prev) => ({ ...prev, email: text.toLowerCase() }));
  };

  const handlePasswordChange = (text: string) => {
    setCredentials((prev) => ({ ...prev, password: text }));
  };

  const validate = () => {
    if (!credentials.email.trim() || !credentials.password.trim()) {
      setErrorMessage(errorMessages.empty);
      return false;
    }

    if (!emailRegex.test(credentials.email)) {
      setErrorMessage(errorMessages.invalidEmail);
      return false;
    }

    setErrorMessage(null);
    return true;
  };

  return (
    <InputPageView>
      <AuthHeader title={"log in om je buurten te bekijken"} />

      <View className={"flex-1 border-b-2 border-gray"}>
        <Text className="text-[16px] text-black font-comfortaa-semibold text-center mb-2">
          {t("login.title")}
        </Text>
        <Text className="text-[14px] text-gray text-center font-comfortaa-medium mb-10">
          {t("login.subtitle")}
        </Text>

        <LabeledInput
          label={t("login.email")}
          value={credentials.email}
          onChange={handleEmailChange}
          editable={true}
          isFocused={focusedField === "email"}
          onFocus={() => setFocusedField("email")}
          onBlur={() => setFocusedField(null)}
          keyboardType="email-address"
          placeholder={t("login.email")}
        />

        <LabeledInput
          label={t("login.password")}
          value={credentials.password}
          onChange={handlePasswordChange}
          editable={true}
          isFocused={focusedField === "password"}
          onFocus={() => setFocusedField("password")}
          onBlur={() => setFocusedField(null)}
          keyboardType="default"
          placeholder={t("login.password")}
          secureTextEntry={!isPasswordVisible}
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

        {errorMessage && (
          <Text className="text-red text-center mb-4">{errorMessage}</Text>
        )}

        <PressableButton onPress={handleLogin} title={t("login.login")} />
      </View>
      <View className="pt-4 items-center">
        <Text className="text-gray mb-2 font-comfortaa-medium">
          {t("login.noaccount")}
        </Text>
        <PressableButton
          onPress={goToRegister}
          title={t("login.register")}
          background={Color.WHITE}
          borderColor={Color.BLUE}
          textColor={Color.BLUE}
          underlineStyle={"underline"}
        />
      </View>
    </InputPageView>
  );
}
