import {WrittenInput} from "@/components/WrittenInput";
import {Pressable, View} from "react-native";
import {Eye, EyeClosed} from "lucide-react-native";
import {useState} from "react";

type Props = {
    placeholder?: string;
    setPassword: (text: string) => void;
    password: string;
}

export const PasswordInput = ({
                                placeholder = "Wachtwoord",
                                setPassword,
                                password
                              }: Props) => {
    const [isPasswordVisible, setIsPasswordVisible] =  useState<boolean>(false);

    return (
        <View className="relative justify-center">
            <WrittenInput
                placeholder={placeholder}
                value={password}
                onChangeText={setPassword}
                inputType="password"
                secureTextEntry={!isPasswordVisible}
            />

            <Pressable onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                       className="absolute right-4 justify-center">
                {isPasswordVisible ? <EyeClosed size={20} color="gray" /> : <Eye size={20} color="gray" />}
            </Pressable>
        </View>
    )
}