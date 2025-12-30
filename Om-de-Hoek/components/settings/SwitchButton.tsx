import {Switch, Text, View} from "react-native";

type Props = {
  label?: string;
  value?: boolean;
  onValueChange?: (value: boolean) => void;
};

const SwitchButton = ({ label, value, onValueChange }: Props) => {
  return (
    <View className="flex-row items-center justify-between">
      <Text className="text-black font-comfortaa-regular text-base">
        {label}
      </Text>
      <Switch
        value={value}
        onValueChange={onValueChange}
        thumbColor="#FFFFFF"
        trackColor={{ false: "#BFBFBF", true: "#2548BC" }}
      />
    </View>
  );
};

export default SwitchButton;
