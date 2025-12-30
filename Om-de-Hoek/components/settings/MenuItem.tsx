import {Text, TouchableOpacity, View} from "react-native";
import {ChevronRight} from "lucide-react-native";

type Props = {
  icon: React.ReactNode;
  label: string;
  onPress: () => void;
  rightLabel?: string;
};

const MenuItem = ({ icon, label, onPress, rightLabel }: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row items-center justify-between py-4 active:opacity-70"
    >
      <View className="flex-row items-center gap-x-4">
        <View className="w-8 items-center justify-center">{icon}</View>
        <Text className="font-comfortaa-regular text-gray text-[14px]">
          {label}
        </Text>
      </View>
      <ChevronRight color="#828282" size={18} />
    </TouchableOpacity>
  );
};

export default MenuItem;
