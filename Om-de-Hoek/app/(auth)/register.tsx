import { useEffect, useRef, useState } from "react";
import type {
  AuthResponse,
  RegisterBody,
  RegisterRequestBody,
} from "@/types/auth";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Keyboard,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import { Step1Email } from "@/components/auth/register/Step1Email";
import { Step2Name } from "@/components/auth/register/Step2Name";
import { Step3BirthDate } from "@/components/auth/register/Step3BirthDate";
import { Step4Address } from "@/components/auth/register/Step4Address";
import { Step5PhoneNumber } from "@/components/auth/register/Step5PhoneNumber";
import { Step6Password } from "@/components/auth/register/Step6Password";
import Step7Neighborhood from "@/components/auth/register/Step7Neighborhood";
import ProgressBar from "@/components/auth/register/ProgressBar";
import { useAuth } from "@/components/auth/context/AuthContext";
import authService from "@/services/authService";
import addressService from "@/services/addressService";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {Color} from "@/types/StyleOptions";

const totalSteps = 7;

const parseDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export default function RegisterPage() {
  const [loginTokens, setLoginTokens] = useState<AuthResponse | null>(null);

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

  const [huidigeIndex, setHuidigeIndex] = useState(0);
  const scrollRef = useRef<ScrollView | null>(null);

  const { signIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const onHide = () => {
      setTimeout(() => {
        scrollRef.current?.scrollTo({ animated: true, y: 0 });
      }, 50);
    };

    const sub = Keyboard.addListener("keyboardDidHide", onHide);
    return () => sub.remove();
  }, []);

  const goToNextStep = () => {
    setHuidigeIndex((prev) => Math.min(prev + 1, totalSteps - 1));
  };

  const nextAndRegister = async () => {
    const dataToRegister: RegisterRequestBody = {
      email: data.email,
      phoneNumber: data.phoneNumber || "",
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
      birthDate: parseDate(data.birthDate),
    };

    await authService.authRegister(dataToRegister);

    const loginResponse = await authService.authLogin(dataToRegister);

    setLoginTokens(loginResponse);

    await addressService.RegisterAddress(
      {
        street: data.streetName,
        houseNumber: data.houseNumber || "",
        postalCode: data.postalCode,
      },
      loginResponse.token
    );
  };

  return (
      <View
          style={{ flex: 1, backgroundColor: Color.WHITE }}
      >
      {huidigeIndex === 0 && (
        <KeyboardAwareScrollView
            style={{ flex: 1, backgroundColor: Color.WHITE }}
            contentContainerStyle={{ paddingBottom: 100, paddingHorizontal: 24 }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            enableOnAndroid={true}
            extraScrollHeight={115}
        >
          <Step1Email
            value={data.email}
            onChange={(email) => setData((prev) => ({ ...prev, email }))}
            onNext={goToNextStep}
            onBack={() => router.push("/(auth)/login")}
          />
        </KeyboardAwareScrollView>
      )}

      {huidigeIndex === 1 && (
          <KeyboardAwareScrollView
              style={{ flex: 1, backgroundColor: Color.WHITE }}
              contentContainerStyle={{ paddingBottom: 100, paddingHorizontal: 24 }}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
              enableOnAndroid={true}
              extraScrollHeight={115}
          >
          <Step2Name
            firstName={data.firstName}
            lastName={data.lastName}
            onChange={({ firstName, lastName }) =>
              setData((prev) => ({ ...prev, firstName, lastName }))
            }
            onNext={goToNextStep}
            onBack={() => setHuidigeIndex((prev) => Math.max(prev - 1, 0))}
          />
            </KeyboardAwareScrollView>
      )}

      {huidigeIndex === 2 && (
          <KeyboardAwareScrollView
              style={{ flex: 1, backgroundColor: Color.WHITE }}
              contentContainerStyle={{ paddingBottom: 100, paddingHorizontal: 24 }}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
              enableOnAndroid={true}
              extraScrollHeight={115}
          >
          <Step3BirthDate
            birthDate={data.birthDate}
            onChange={(birthDate) =>
              setData((prev) => ({ ...prev, birthDate }))
            }
            onNext={goToNextStep}
            onBack={() => setHuidigeIndex((prev) => Math.max(prev - 1, 0))}
          />
            </KeyboardAwareScrollView>
      )}

      {huidigeIndex === 3 && (
          <KeyboardAwareScrollView
              style={{ flex: 1, backgroundColor: Color.WHITE }}
              contentContainerStyle={{ paddingBottom: 100, paddingHorizontal: 24 }}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
              enableOnAndroid={true}
              extraScrollHeight={115}
          >
          <Step4Address
            streetName={data.streetName}
            houseNumber={data.houseNumber}
            municipality={data.municipality}
            postalCode={data.postalCode}
            onChange={({ streetName, houseNumber, municipality, postalCode }) =>
              setData((prev) => ({
                ...prev,
                streetName,
                houseNumber,
                municipality,
                postalCode,
              }))
            }
            onNext={goToNextStep}
            onBack={() => setHuidigeIndex((prev) => Math.max(prev - 1, 0))}
          />
            </KeyboardAwareScrollView>
      )}

      {huidigeIndex === 4 && (
          <KeyboardAwareScrollView
              style={{ flex: 1, backgroundColor: Color.WHITE }}
              contentContainerStyle={{ paddingBottom: 100, paddingHorizontal: 24 }}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
              enableOnAndroid={true}
              extraScrollHeight={115}
          >
          <Step5PhoneNumber
            value={data.phoneNumber}
            onChange={(phoneNumber) =>
              setData((prev) => ({ ...prev, phoneNumber }))
            }
            onNext={goToNextStep}
            onBack={() => setHuidigeIndex((prev) => Math.max(prev - 1, 0))}
          />
            </KeyboardAwareScrollView>
      )}

      {huidigeIndex === 5 && (
          <KeyboardAwareScrollView
              style={{ flex: 1, backgroundColor: Color.WHITE }}
              contentContainerStyle={{ paddingBottom: 100, paddingHorizontal: 24 }}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
              enableOnAndroid={true}
              extraScrollHeight={115}
          >
          <Step6Password
            password={data.password}
            onChange={(password) => setData((prev) => ({ ...prev, password }))}
            onNext={async () => {
              await nextAndRegister();
              goToNextStep();
            }}
            onBack={() => setHuidigeIndex((prev) => Math.max(prev - 1, 0))}
          />
            </KeyboardAwareScrollView>
      )}

      {huidigeIndex === 6 && loginTokens && (
        <View
          style={{ flex: 1, paddingHorizontal: 12, justifyContent: "center" }}
        >
          <Step7Neighborhood
            postalCode={data.postalCode}
            token={loginTokens.token}
            onNext={async () => {
              await signIn(loginTokens.token, loginTokens.refreshToken);
              router.push("/");
            }}
            onBack={() => setHuidigeIndex((prev) => Math.max(prev - 1, 0))}
          />
        </View>
      )}
      <ProgressBar currentStep={huidigeIndex} totalSteps={totalSteps} />
      </View>
  );
}
