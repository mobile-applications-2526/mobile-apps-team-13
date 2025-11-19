import {useState, useEffect} from "react";
import {ScrollView, Text} from "react-native";
import {WrittenInput} from "@/components/WrittenInput";
import {PressableButton} from "@/components/PressableButton";
import {Color} from "@/types/StyleOptions";
import AuthHeader from "@/components/auth/AuthHeader";

type Props = {
    onNext: () => void;
    onChange: (email: string) => void;
}

export const Step1Email = ({ onNext, onChange }: Props) => {
    const [email, setEmail] = useState<string>('');
    const [isValid, setIsValid] = useState<boolean>(false);

    useEffect(() => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const valid = emailRegex.test(email);
        setIsValid(valid);

        onChange(email)

        }, [email])

    const handleEmailChange = (text: string) => {
        const loweredText = text.toLowerCase();
        setEmail(loweredText);
    }


    return (
        <ScrollView
            className="p-4"
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled">
            <AuthHeader
                title={"maak een account aan"}
            />
            <Text className="text-[16px] text-black font-comfortaa-semibold text-center mb-2">
                Maak een account
            </Text>
            <Text className="text-[14px] text-gray text-center font-comfortaa-medium mb-10">
                En ontdek je buurt.
            </Text>

            <WrittenInput
                placeholder="E-mail"
                value={email}
                onChangeText={handleEmailChange}
                inputType="email-address"
            />

            <PressableButton
                onPress={async () => onNext()}
                disabled={!isValid}
                title="Verdergaan"
                background={isValid ? Color.BLUE : Color.GRAY}
                />
        </ScrollView>
    )
}