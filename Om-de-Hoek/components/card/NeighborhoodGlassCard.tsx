import { View, Text, TouchableOpacity } from "react-native";
import { Users } from "lucide-react-native";
import { useTranslation } from "react-i18next";

import type React from "react";

type Props = {
  name: string;
  participants?: number;
  action: "join" | "leave";
  onJoin?: () => void;
  onLeave?: () => void;
};

const NeighborhoodGlassCard: React.FC<Props> = ({
  name,
  participants,
  action,
}) => {
  
  const { t } = useTranslation();

  return (
    <View
      className="mx-2 my-2 rounded-lg bg-white px-2 py-3
             shadow-sm"
      style={{
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 3,
        shadowOffset: { width: 0, height: 1 },
        elevation: 2,
      }}
    >
      <View className="flex-row items-start justify-between">
        <View className="pr-4">
          <View className="bg-[#E8E8E8] opacity-50 p-2 rounded-md">
            <Users color="gray" size={25} strokeWidth={1.5} />
          </View>
        </View>

        {/* Linkerkant */}
        <View className="flex-col gap-2 flex-1">
          <Text className="text-black font-comfortaa-bold text-base">
            {name}
          </Text>

          <View className="flex-row items-center gap-1">
            <Users color="#828282" size={12} />
            <Text className="text-gray font-comfortaa-medium text-xs">
              {participants} {t("register.neighborhood.participants")}
            </Text>
          </View>
        </View>

        {/* Rechterkant */}
        <TouchableOpacity className="bg-blue px-3 py-2.5 rounded-xl self-center">
          <Text className="text-white font-comfortaa-bold text-xs">
            {action === "join" ? t("register.neighborhood.join") : t("register.neighborhood.leave")}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NeighborhoodGlassCard;
