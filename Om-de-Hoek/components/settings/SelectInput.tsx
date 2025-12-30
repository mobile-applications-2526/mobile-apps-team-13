import {Text, TouchableOpacity, View} from "react-native";
import {ChevronDown} from "lucide-react-native";

type Props = {
    label: string;
    value: string;
    onPress: () => void;
};
export default function SelectInput({ label, value, onPress }: Props) {
    return(
        <View className="mb-6 ">
            <Text className="text-black mb-2 font-comfortaa-bold">
                {label}
            </Text>

            <TouchableOpacity
                onPress={onPress}
                className="flex-row items-center border justify-between border-black rounded-xl px-4 py-3"
            >
                <Text className="text-black font-comfortaa-regular">
                    {value}
                </Text>
                <ChevronDown size={20} color="#100D08"/>
            </TouchableOpacity>
        </View>
    )
};