import {Stack} from "expo-router";
import {Image, Pressable, Text, View} from "react-native";
import React from "react";
import {ChevronLeft} from "lucide-react-native";
import {useTranslation} from "react-i18next";

type Props = {
  title: string;
  onBack?: () => void;
};

export default function AuthHeader({ title, onBack }: Props) {
  const { t } = useTranslation();
  return (
    <>
      <Stack.Screen options={{ title }} />
      <View className="relative">
        {onBack && (
          <Pressable onPress={onBack} className="absolute left-4 top-0">
            <ChevronLeft size={28} color="black" />
          </Pressable>
        )}
        <View className="items-center">
          <Text className={"text-[24px] text-black font-comfortaa-semibold"}>
            Om de Hoek
          </Text>
          <Text className={"text-[11px] text-gray font-comfortaa-medium"}>
            {t("logo.title")}
          </Text>
        </View>
        <View className="items-center py-8">
          <Image
            source={require("@/assets/images/logo.png")}
            className={"w-[180] h-[180]"}
          />
        </View>
      </View>
    </>
  );
}
