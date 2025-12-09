import { View, Text, TouchableOpacity } from "react-native"
import { UserRound, UsersRound } from "lucide-react-native"

import React from "react"

type Props = {
  name: string
  participants?: number
  action: "join" | "leave"
  onJoin?: () => void
  onLeave?: () => void
}

const NeighborhoodGlassCard: React.FC<Props> = ({ name, participants, action }) => {
  return (
    <View
      className="mx-2 my-2 rounded-lg bg-white py-4 px-4"
      style={{
        shadowColor: "#100D08",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 4,
      }}
    >
      <View className="flex-row items-center justify-between">
        {/* Linkerkant */}
        <View className="flex-row items-center gap-2">
          <View className="w-10 h-10 rounded-lg bg-[#F4F4F4] items-center justify-center">
            <UsersRound color="#828282" size={24} />
          </View>

          <Text className="text-black font-comfortaa-bold text-[12px]">{name}</Text>
        </View>

        {/* Rechterkant */}
        <View className="flex-row items-center gap-2">
          <View className="flex-row items-center gap-1">
            <UserRound color="#828282" size={12} />
            <Text className="text-gray font-comfortaa-medium text-[12px]">{participants} leden</Text>
          </View>

          <TouchableOpacity className="bg-[#2548BC] px-2 py-1.5 rounded-xl">
            <Text className="text-white font-comfortaa-bold text-[12px]">{action === "join" ? "Deelnemen" : "Verlaten"}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default NeighborhoodGlassCard