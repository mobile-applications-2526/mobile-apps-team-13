import {TouchableOpacity, View, Text} from "react-native";
import { ChevronRight } from 'lucide-react-native';

const MenuItem = ({ icon, label, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row items-center justify-between py-4 active:opacity-70"
    >
      <View className="flex-row items-center gap-x-4">
        <View className="w-8 items-center justify-center">
          {icon}
        </View>
        <Text className="font-comfortaa-regular text-gray text-[14px]">
          {label}
        </Text>
      </View>
      <ChevronRight color="#828282" size={18} />
    </TouchableOpacity>
  );
};

export default MenuItem;