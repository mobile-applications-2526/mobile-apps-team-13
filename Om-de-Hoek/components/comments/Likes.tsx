import React, {useState} from "react";
import {Pressable, Text, View} from "react-native";
import {Heart} from "lucide-react-native";
import {Color} from "@/types/StyleOptions";

type Props = {
  initialCount: number;
  initialLiked?: boolean;
  onToggle?: (liked: boolean, count: number) => void;
};

export default function Likes({ initialCount, initialLiked = false, onToggle }: Props) {
  const [count, setCount] = useState<number>(initialCount);
  const [liked, setLiked] = useState<boolean>(initialLiked);

  const toggle = () => {
    const next = !liked;
    const nextCount = next ? count + 1 : Math.max(0, count - 1);
    setLiked(next);
    setCount(nextCount);
    onToggle?.(next, nextCount);
  };

  return (
    <View className="flex-row items-center mb-4">
      <Pressable onPress={toggle} className="flex-row items-center">
        <Heart size={20} color={liked ? Color.RED : Color.GRAY} />
        <Text className={`ml-2 text-base font-comfortaa-medium ${liked ? "text-black" : "text-gray"}`}>
          {count}
        </Text>
      </Pressable>
    </View>
  );
}
