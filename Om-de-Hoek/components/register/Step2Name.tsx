import {useState, useEffect} from "react";
import {Text, View} from "react-native";
import {WrittenInput} from "@/components/WrittenInput";
import {PressableButton} from "@/components/PressableButton";
import {Color} from "@/types/StyleOptions";

type Props = {
    onNext: () => void;
    onChange: (name: { firstName: string, lastName: string }) => void;
    }

export const Step2Name = ({onNext, onChange}: Props) => {
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [isValid, setValid] = useState<boolean>(false);

    useEffect(() => {
        const valid = firstName.length > 0 && lastName.length > 0;
        setValid(valid);

        onChange({firstName, lastName});

        }, [firstName, lastName])


    return (
        <View className="flex-1 p-6">
            <Text className="text-[16px] text-black font-comfortaa-semibold text-center mb-2">
                Wat is uw naam?
            </Text>
            <Text className="text-[14px] text-gray text-center font-comfortaa-medium mb-10">
                Vertel ons hoe we je mogen aanspreken.
            </Text>

            <WrittenInput
                placeholder="Voornaam"
                value={firstName}
                onChangeText={setFirstName}
                inputType="default"
            />

            <WrittenInput
                placeholder="Achternaam"
                value={lastName}
                onChangeText={setLastName}
                inputType="default"
            />

            <PressableButton
                onPress={async () => onNext()}
                disabled={!isValid}
                title="Verdergaan"
                background={isValid ? Color.BLUE : Color.GRAY}
                />
        </View>
    )
}