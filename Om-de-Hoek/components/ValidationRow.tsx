import { View, Text } from "react-native";
import { CircleCheck } from "lucide-react-native";

export const ValidationRow = ({
  isValid,
  text,
}: {
  isValid: boolean;
  text: string;
}) => {
  return (
    <View className="flex-row items-center px-3 mb-2.5 rounded-lg bg-gray-50">
      {isValid ? (
        <CircleCheck size={18} color="green" strokeWidth={2.5} />
      ) : (
        <CircleCheck size={18} color="gray" strokeWidth={2.5} />
      )}

      <Text
        className={`ml-3 font-comfortaa-regular text-sm ${isValid ? "text-green-600" : "text-gray"}`}
      >
        {text}
      </Text>
    </View>
  );
};
