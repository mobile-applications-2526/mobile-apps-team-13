import { View, Text } from "react-native";

type Props = {
  title: string;
  subtitle: string;
};

export default function SettingsHeader({ title, subtitle }: Props) {
  return (
    <View className="mt-10 mb-8">
      <Text className="font-comfortaa-bold text-black text-[24px]">
        {title}
      </Text>
      <Text className="font-comfortaa-medium text-gray text-[14px] ml-8">
        {subtitle}
      </Text>
    </View>
  );
}
