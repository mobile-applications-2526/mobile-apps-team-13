import {Switch, Text, View} from "react-native";

type Props = {
    title : string;
    label: string;
    isEnabled: boolean;
    onToggle: (val: boolean) => void;
};

export default function ThemeToggle({ title, label, isEnabled, onToggle }: Props) {
    return(
        <View className="mb-4">
            <Text className="text-black font-comfortaa-bold mb-0">
                {title}
            </Text>
            <View className="flex-row items-center justify-between -mt-1">
                <Text className="text-black font-comfortaa-regular">
                    {label}
                </Text>
                <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={onToggle}
                    value={isEnabled}
                />
            </View>
        </View>
    )
};