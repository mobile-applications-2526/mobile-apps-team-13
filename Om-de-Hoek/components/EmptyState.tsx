import React from "react";
import { View, Text } from "react-native";
import { PressableButton } from "@/components/PressableButton"; // Pas het pad aan indien nodig
import { Color } from "@/types/StyleOptions";

type Props = {
  title: string;
  message?: string;
  icon?: React.ReactNode;
  containerStyle?: string;
  actionLabel?: string;
  onAction?: () => void;
};

export default function EmptyState({
  title,
  message,
  icon,
  containerStyle = "",
  actionLabel,
  onAction,
}: Props) {
  return (
    <View
      className={`items-center justify-center py-10 px-6 ${containerStyle}`}
    >
      {icon && (
        <View className="bg-gray-100 p-6 rounded-full mb-4">{icon}</View>
      )}

      <Text className="text-[#2548BC] font-comfortaa-bold text-lg text-center">
        {title}
      </Text>

      {message && (
        <Text className="text-gray-400 font-comfortaa-regular text-sm text-center mt-2 leading-5 mb-6">
          {message}
        </Text>
      )}
      {actionLabel && onAction && (
        <View className="w-full px-4">
          <PressableButton
            title={actionLabel}
            onPress={async () => {
              onAction();
            }}
            background={Color.BLUE}
            disabled={false}
          />
        </View>
      )}
    </View>
  );
}
