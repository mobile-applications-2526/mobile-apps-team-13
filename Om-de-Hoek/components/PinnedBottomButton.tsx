import { TouchableOpacity, View, Text } from "react-native";
import { Check } from "lucide-react-native";

type Props = {
  count?: number;
  onNext?: () => void;
};

export default function PinnedBottomButton({ count, onNext }: Props) {
  return (
    <View className="absolute bottom-4 left-4 right-4 z-50">
      <TouchableOpacity
        onPress={onNext}
        className="w-full flex-row justify-center elevation-md items-center bg-blue rounded-xl shadow-sm shadow-black/30 py-4"
      >
        <Check color={"#FFFF"} size={24} />
        <Text className="text-white font-comfortaa-bold ml-3 text-lg">
          Klaar ({count} buurt(en) geselecteerd){" "}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
