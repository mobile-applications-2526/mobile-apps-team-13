import { Text, View} from "react-native";
import React, {useState} from "react";
import {LoginBody} from "@/types/auth";
import {useAuth} from "@/components/auth/context/AuthContext";
import {router} from "expo-router";
import authService from "@/services/authService";
import {CustomError} from "@/types/Errors/CustomError";
import AuthHeader from "@/components/auth/AuthHeader";
import {WrittenInput} from "@/components/WrittenInput";
import {PasswordInput} from "@/components/auth/PasswordInput";
import {PressableButton} from "@/components/PressableButton";
import {Color} from "@/types/StyleOptions";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const errorMessages = {
    invalidEmail: "Ongeldig e-mail formaat.",
    emptyPassword: "Wachtwoord mag niet leeg zijn.",
    invalidCredentials: "Ongeldige inloggegevens. Probeer het opnieuw."
}

const references = {
    registerPage: '/(auth)/register'
}

export default function LoginPage() {
    const [credentials, setCredentials] = useState<LoginBody>({
        email: '',
        password: ''
    })
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const { signIn } = useAuth();

    const goToRegister = async () => {
        router.replace(references.registerPage);
    }

    const handleLogin = async () => {
        try {
            if(!validate()) {
                return;
            }
            const loginResponse = await authService.authLogin(credentials);
            await signIn(loginResponse.token, loginResponse.refreshToken);
        } catch (error) {
            if(error instanceof CustomError) {
                setErrorMessage(errorMessages.invalidCredentials);
                return;
            }
            setErrorMessage('An unexpected error occurred. Please try again.');
        }
    }

    const handleEmailChange = (text: string) => {
        setCredentials((prev) => ({ ...prev, email: text.toLowerCase() }));
    }

    const handlePasswordChange = (text: string) => {
        setCredentials((prev) => ({ ...prev, password: text }));
    }

    const validate = () => {
        let isValid = true;
        let message = "";

        if (!emailRegex.test(credentials.email)) {
            isValid = false;
            message += errorMessages.invalidEmail;
        }
        if (credentials.password.trim() === "") {
            isValid = false;
            if (message) message += "\n";
            message += errorMessages.emptyPassword;
        }

        setErrorMessage(isValid ? null : message);
        return isValid;
    }

    return(
        <View className="flex-1 p-4 bg-white">
            <AuthHeader title={"log in om je buurten te bekijken"} />

            <View className={"flex-1 p-6 border-b-2 border-gray"}>
                <Text className="text-[16px] text-black font-comfortaa-semibold text-center mb-2">
                    Log in
                </Text>
                <Text className="text-[14px] text-gray text-center font-comfortaa-medium mb-10">
                    En praat met je buren.
                </Text>

                <WrittenInput
                    placeholder={"email@example.com"}
                    value={credentials.email}
                    onChangeText={handleEmailChange}
                    inputType={"email-address"}
                />

                <PasswordInput
                    setPassword={handlePasswordChange}
                    password={credentials.password}
                />

                {errorMessage && (
                    <Text className="text-red text-center mb-4">
                        {errorMessage}
                    </Text>
                )}

                <PressableButton
                    onPress={handleLogin}
                    title={"Inloggen"}
                />
            </View>
            <View className="py-4 items-center">
                <Text className="text-gray mb-2 font-comfortaa-medium">
                    Nog geen account?
                </Text>
                <PressableButton
                    onPress={goToRegister}
                    title={"Registreer hier"}
                    background={Color.WHITE}
                    borderColor={Color.BLUE}
                    textColor={Color.BLUE}
                />
            </View>
        </View>
    )
}