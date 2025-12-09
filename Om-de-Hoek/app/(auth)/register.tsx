import { useState } from "react";
import type { RegisterBody, RegisterRequestBody } from "@/types/auth";
import { View, KeyboardAvoidingView, Platform } from "react-native";
import { useRouter } from "expo-router";
import { Step1Email } from "@/components/auth/register/Step1Email";
import { Step2Name } from "@/components/auth/register/Step2Name";
import { Step3BirthDate } from "@/components/auth/register/Step3BirthDate";
import { Step4Address } from "@/components/auth/register/Step4Address";
import { Step5PhoneNumber } from "@/components/auth/register/Step5PhoneNumber";
import { Step6Password } from "@/components/auth/register/Step6Password";
import { useAuth } from "@/components/auth/context/AuthContext";
import authService from "@/services/authService";
import ProgressBar from "@/components/auth/register/ProgressBar";
import Step7Neighborhood from "@/components/auth/register/Step7Neighborhood";

const totalSteps = 7;

const parseDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); //jan = 0 en moet 1 zijn
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export default function RegisterPage() {
  const [data, setData] = useState<RegisterBody>({
    email: "",
    firstName: "",
    lastName: "",
    streetName: "",
    houseNumber: "",
    municipality: "",
    postalCode: "",
    password: "",
    birthDate: new Date(),
    phoneNumber: undefined,
  });

  const [huidigeIndex, setHuidigeIndex] = useState<number>(0);

  const { signIn } = useAuth();
  const router = useRouter();

  const goToNextStep = () => {
    setHuidigeIndex((prev) => Math.min(prev + 1, totalSteps - 1));
  };

  const nextAndRegister = async () => {
    const dataToRegister: RegisterRequestBody = {
      email: data.email,
      phoneNumber: (data as any).phoneNumber || "",
      password: data.password,
      username: `${data.firstName}${data.lastName}`,
      birthDate: parseDate(data.birthDate),
    };

    await authService.authRegister(dataToRegister);
    const loginTokens = await authService.authLogin(dataToRegister);
    await signIn(loginTokens.token, loginTokens.refreshToken);
  };

  return (
    <View className="flex-1 bg-white px-6 pt-12 pb-8">
      <View style={{ flex: 1 }}>
        {huidigeIndex === 0 && (
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            className="flex-1 justify-center"
            keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 30}
          >
            <Step1Email
              onNext={goToNextStep}
              value={data.email}
              onChange={(email) => setData((prev) => ({ ...prev, email }))}
              onBack={() => router.push("/(auth)/login")}
            />
          </KeyboardAvoidingView>
        )}

        {huidigeIndex === 1 && (
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            className="flex-1 justify-center"
            keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 30}
          >
            <Step2Name
              onNext={goToNextStep}
              onChange={({ firstName, lastName }) =>
                setData((prev) => ({ ...prev, firstName, lastName }))
              }
              onBack={() => setHuidigeIndex((prev) => Math.max(prev - 1, 0))}
            />
          </KeyboardAvoidingView>
        )}

        {huidigeIndex === 2 && (
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            className="flex-1 justify-center"
            keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 30}
          >
            <Step3BirthDate
              onNext={goToNextStep}
              onChange={(birthDate) =>
                setData((prev) => ({ ...prev, birthDate }))
              }
              onBack={() => setHuidigeIndex((prev) => Math.max(prev - 1, 0))}
            />
          </KeyboardAvoidingView>
        )}

        {huidigeIndex === 3 && (
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            className="flex-1 justify-center"
            keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 30}
          >
            <Step4Address
              onNext={goToNextStep}
              onChange={({
                streetName,
                houseNumber,
                municipality,
                postalCode,
              }) =>
                setData((prev) => ({
                  ...prev,
                  streetName,
                  houseNumber,
                  municipality,
                  postalCode,
                }))
              }
              onBack={() => setHuidigeIndex((prev) => Math.max(prev - 1, 0))}
            />
          </KeyboardAvoidingView>
        )}

        {huidigeIndex === 4 && (
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            className="flex-1 justify-center"
            keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 30}
          >
            <Step5PhoneNumber
              onNext={goToNextStep}
              onChange={(phoneNumber) =>
                setData((prev) => ({ ...prev, phoneNumber }))
              }
              onBack={() => setHuidigeIndex((prev) => Math.max(prev - 1, 0))}
            />
          </KeyboardAvoidingView>
        )}

        {huidigeIndex === 5 && (
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            className="flex-1 justify-center"
            keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 30}
          >
            <Step6Password
              onNext={goToNextStep}
              onChange={(password) =>
                setData((prev) => ({ ...prev, password }))
              }
              onBack={() => setHuidigeIndex((prev) => Math.max(prev - 1, 0))}
            />
          </KeyboardAvoidingView>
        )}

        {huidigeIndex === 6 && (
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 30}
          >
            <Step7Neighborhood postalCode={data.postalCode} onNext={nextAndRegister} onBack={() => setHuidigeIndex((prev) => Math.max(prev - 1, 0))} />
          </KeyboardAvoidingView>
        )}
      </View>
      <ProgressBar currentStep={huidigeIndex} totalSteps={totalSteps} />
    </View>
  );
}
