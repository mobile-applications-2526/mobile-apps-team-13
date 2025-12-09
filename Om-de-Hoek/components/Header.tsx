import { ArrowLeft, ChevronLeft } from "lucide-react-native";
import { Pressable, ScrollView, Text, View } from "react-native";
import Back from "./Back";

type Props = {
    title: string;
    subtitle: string;
    onBack?: () => void;
}

export default function Header({ title, subtitle, onBack }: Props) {
    return (
        <View className="flex flex-row">
            {onBack && (
            <View className="mt-3 mr-3">
                <Back icon={<ArrowLeft size={24} color="black" />} onBack={onBack} />
            </View>
            )}
            <View className="items-center">
                <Text className="font-comfortaa-bold text-[24px] text-black">{title}</Text>
                <Text className="font-comfortaa-medium text-[16px] text-gray">{subtitle}</Text>
            </View>
        </View>
    )
}