import {useState} from "react";
import {Text, View} from "react-native";
import {WrittenInput} from "@/components/WrittenInput";
import {PressableButton} from "@/components/PressableButton";
import {Color} from "@/types/StyleOptions";

type Props = {
    onNext: () => void;
    onChange: (email: string) => void;
}

export const Step1Email = ({ onNext, onChange }: Props) => {
    const [email, setEmail] = useState<string>('');
    const [isValid, setIsValid] = useState<boolean>(false);

    const handleEmailChange = (text: string) => {
        const loweredText = text.toLowerCase();
        setEmail(loweredText);
        onChange(loweredText);
    }

    const validate = (): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const valid = emailRegex.test(email);
        setIsValid(valid);
        return valid;
    }

    const handlePressNext = () => {
        if(validate()){
            onNext();
        }
    }

    return (
        <View className="flex-1 p-6">
            <Text className="text-3xl font-bold text-center mb-2">
                Maak een account
            </Text>
            <Text className="text-lg text-gray-600 text-center mb-10">
                En ontdek je buurt
            </Text>

            <WrittenInput
                placeholder="E-mailadres"
                value={email}
                onChangeText={handleEmailChange}
                inputType="email-address"
            />

            <PressableButton
                onPress={async () => handlePressNext()}
                disabled={!isValid}
                title="Verdergaan"
                background={isValid ? Color.BLUE : Color.GRAY}
                />
        </View>
    )
}