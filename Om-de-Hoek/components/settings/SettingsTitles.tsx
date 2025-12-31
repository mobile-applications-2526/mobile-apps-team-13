import { Text, View } from "react-native";

type Props = {
  title: string;
  subtitle?: string;
};

export default function SettingsTitles({ title, subtitle }: Props) {
  return (
    <View className="w-full px-6 mt-8 mb-4">
      {subtitle && (
        <Text className="font-comfortaa-bold text-sm text-gray uppercase tracking-widest mb-1">
          {subtitle}
        </Text>
      )}

      <Text className="font-comfortaa-bold text-4xl text-black leading-tight">
        {title}
      </Text>
    </View>
  );
}
