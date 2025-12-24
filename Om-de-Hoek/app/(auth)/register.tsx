import {useEffect, useRef, useState} from "react";
import type { AuthResponse, RegisterBody, RegisterRequestBody } from "@/types/auth";
import {View, KeyboardAvoidingView, Platform, ScrollView, Keyboard} from "react-native";
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
import addressService from "@/services/addressService";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";

const totalSteps = 7;

const parseDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); //jan = 0 en moet 1 zijn
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export default function RegisterPage() {
  const [logintokens, setLoginTokens] = useState<AuthResponse | null>(null);
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

    const scrollRef =  useRef<ScrollView | null>(null);

  const { signIn, token } = useAuth();
  const router = useRouter();

    useEffect(() => {
        const onHide = () => {
            setTimeout(() => scrollRef.current?.scrollTo({ animated: true, y: 0 }), 50);
        }

        const sub = Keyboard.addListener("keyboardDidHide", onHide);

        return () => {
            sub.remove();
        }
    }, []);

  const goToNextStep = () => {
    setHuidigeIndex((prev) => Math.min(prev + 1, totalSteps - 1));
  };

  const nextAndRegister = async () => {
    const dataToRegister: RegisterRequestBody = {
      email: data.email,
      phoneNumber: (data as any).phoneNumber || "",
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
      birthDate: parseDate(data.birthDate),
    };
    console.log("Register body:", dataToRegister);
    await authService.authRegister(dataToRegister);
   
    setLoginTokens(await authService.authLogin(dataToRegister));
    // await addressService.RegisterAddress({
    //   street: data.streetName,
    //   houseNumber: data.houseNumber || "",
    //   postalCode: data.postalCode,
    //   residentId: loginTokens.id,}, token!); 
  };

  const keyboardVerticalOffset = Platform.OS === "ios" ? 0 : 0;

  return (
      <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1, backgroundColor: "white" }}
          keyboardVerticalOffset={keyboardVerticalOffset}
      >
          <ScrollView
              ref={scrollRef}
              contentContainerStyle={{
                  flexGrow: 1,
                  paddingHorizontal: 24
              }}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
          >
        {huidigeIndex === 0 && (
            <Step1Email
              onNext={goToNextStep}
              value={data.email}
              onChange={(email) => setData((prev) => ({ ...prev, email }))}
              onBack={() => router.push("/(auth)/login")}
            />
        )}

        {huidigeIndex === 1 && (
            <Step2Name
              onNext={goToNextStep}
              onChange={({ firstName, lastName }) =>
                setData((prev) => ({ ...prev, firstName, lastName }))
              }
              firstName={data.firstName}
              lastName={data.lastName}
              onBack={() => setHuidigeIndex((prev) => Math.max(prev - 1, 0))}
            />
        )}

        {huidigeIndex === 2 && (
            <Step3BirthDate
              onNext={goToNextStep}
              onChange={(birthDate) =>
                setData((prev) => ({ ...prev, birthDate }))
              }
              birthDate={data.birthDate}
              onBack={() => setHuidigeIndex((prev) => Math.max(prev - 1, 0))}
            />
        )}

        {huidigeIndex === 3 && (
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
              streetName={data.streetName}
              houseNumber={data.houseNumber}
              municipality={data.municipality}
              postalCode={data.postalCode}
              onBack={() => setHuidigeIndex((prev) => Math.max(prev - 1, 0))}
            />
        )}

        {huidigeIndex === 4 && (
            <Step5PhoneNumber
              onNext={goToNextStep}
              onChange={(phoneNumber) =>
                setData((prev) => ({ ...prev, phoneNumber }))
              }
              value={(data as any).phoneNumber}
              onBack={() => setHuidigeIndex((prev) => Math.max(prev - 1, 0))}
            />
        )}

        {huidigeIndex === 5 && (
            <Step6Password
              onNext={async () => {
                await nextAndRegister();
                goToNextStep();
              }}
              onChange={(password) =>
                setData((prev) => ({ ...prev, password }))
              }
              password={data.password}
              onBack={() => setHuidigeIndex((prev) => Math.max(prev - 1, 0))}
            />
        )}

        {huidigeIndex === 6 && (
            <Step7Neighborhood
              postalCode={data.postalCode}
              onNext={async () =>  { await signIn(logintokens!.token, logintokens!.refreshToken); router.push("/"); }}
              onBack={() => setHuidigeIndex((prev) => Math.max(prev - 1, 0))}
              token={logintokens?.token}

            />
        )}
              <ProgressBar currentStep={huidigeIndex} totalSteps={totalSteps} />
            </ScrollView>
      </KeyboardAvoidingView>
  );
}
