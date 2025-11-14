import { View, Text } from "react-native";
import { CircleCheck } from "lucide-react-native"

export const ValidationRow = ({ isValid, text}: { isValid: boolean, text: string}) => {
    return (
    <View className="flex-row items-center mb-1">
        {isValid ? <CircleCheck size={16} color="green" /> : <CircleCheck size={16} color="gray" />}
        <Text className={`ml-2 ${isValid ? 'text-green' : 'text-gray'}`}>{text}</Text>
    </View>
)};