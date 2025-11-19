import {useState, useEffect, useRef} from "react";
import {Text, View} from "react-native";
import PhoneInput from "react-native-phone-number-input";
import {PressableButton} from "@/components/PressableButton";
import {Color} from "@/types/StyleOptions";

type Props = {
    onNext: () => void;
    onChange: (formattedPhoneNumber: string) => void;
}

export const Step5PhoneNumber = ({ onNext, onChange }: Props) => {
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [formattedValue, setFormattedValue] = useState<string>('');
    const [isValid, setIsValid] = useState<boolean>(true);

    const phoneInputRef = useRef<PhoneInput>(null);

    useEffect(() => {

        if (phoneNumber.length === 0) {
            setIsValid(true);
            onChange('');
            return;
        }

        const checkValid = phoneInputRef.current?.isValidNumber(phoneNumber);
        setIsValid(checkValid ?? false);

        if (checkValid) {
            onChange(formattedValue);
        } else {
             onChange('');
        }

        }, [phoneNumber, formattedValue])


    return (
        <View className="flex-1 p-6">
            <Text className="text-[16px] text-black font-comfortaa-semibold text-center mb-2">
                Wat is uw telefoonnummer?
            </Text>
            <Text className="text-[14px] text-gray text-center font-comfortaa-medium mb-10">
                Waar kan men je in geval van nood bereiken?
            </Text>

            <PhoneInput
                ref={phoneInputRef}
                defaultValue={phoneNumber}
                defaultCode="BE"
                layout="second"
                onChangeText={(text) => {
                    setPhoneNumber(text);
                }}
                onChangeFormattedText={(text) => {
                    setFormattedValue(text);
                }}
                withDarkTheme={false}
                withShadow
                autoFocus={false}
                containerStyle={{
                    width: '100%',
                    borderColor: '##E8E8E8',
                    borderWidth: 1,
                    borderRadius: 8,
                    marginBottom: 20,
                    backgroundColor: 'white'
                }}
                textInputStyle={{
                    width: '100%',
                    height: 50,
                    padding: 10,
                    fontFamily: 'comfortaa-medium',
                }}
                codeTextStyle={{
                    fontFamily: 'comfortaa-medium',
                    height: 50,
                    lineHeight: 50,
                }}
                countryPickerButtonStyle={{
                    width: 80,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
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