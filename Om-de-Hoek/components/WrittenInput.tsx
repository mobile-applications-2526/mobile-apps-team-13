import {TextInput} from "react-native";

type Props = {
    placeholder: string;
    value: string;
    onChangeText: (text: string) => void;
    inputType?: 'default' | 'email-address' | 'numeric' | 'phone-pad' | 'password';
    secureTextEntry?: boolean;
}

export const WrittenInput = ({
    placeholder,
    value,
    onChangeText,
    inputType = 'default',
    secureTextEntry = false,
}: Props) => {
    return(
        <TextInput
            className="border border-gray p-4 rounded-lg text-base mb-4"
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            keyboardType={inputType === 'password' ? 'default' : inputType}
            secureTextEntry={secureTextEntry}
            autoCapitalize="none"
            autoCorrect={false}
        />
    )
}