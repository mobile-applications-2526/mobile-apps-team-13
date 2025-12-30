import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";

type Props = {
  title: string;
};

export default function HomeHeader({ title }: Props) {
  const { i18n } = useTranslation();

  const today = new Date().toLocaleDateString(i18n.language, {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  const formattedDate = today.charAt(0).toUpperCase() + today.slice(1);

  return (
    <View className="w-full px-6 pt-12 pb-4 flex-col justify-end">
      <Text className="font-comfortaa-bold text-sm text-gray uppercase tracking-widest mb-1">
        {formattedDate}
      </Text>

      <Text className="font-comfortaa-bold text-4xl text-black leading-tight">
        {title}
      </Text>
    </View>
  );
}
