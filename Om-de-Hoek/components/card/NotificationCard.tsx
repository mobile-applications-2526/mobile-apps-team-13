import { useRouter } from "expo-router";
import { ChevronRight } from "lucide-react-native";
import { View, Text, TouchableOpacity } from "react-native";
import { Message } from "@/types/message";

type Props = {
  icon?: React.ReactNode;
  title: string;
  subtitle: string;
  time?: string;
  message: Message;
};

const NotificationCard: React.FC<Props> = ({
  icon,
  title,
  subtitle,
  time,
  message,
}) => {
  const router = useRouter();

  const handlePress = () => {
    router.push({
      pathname: "/(notifications)/MessageDetail/[id]",
      params: {
        id: encodeURIComponent(message.id),
        message: encodeURIComponent(JSON.stringify(message)),
      },
    });
  };

  return (
    <TouchableOpacity
      className="mx-0 my-2 rounded-3xl bg-white p-4 shadow-sm"
      style={{
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
      }}
      onPress={handlePress}
    >
      <View className="flex-row items-center">
        <View className="mr-4">
          <View className="bg-[#F5F5F5] h-12 w-12 items-center justify-center rounded-xl">
            {icon}
          </View>
        </View>

        <View className="flex-1 justify-center gap-0.5">
          <View className="flex-row items-baseline gap-2">
            <Text className="text-black font-comfortaa-bold text-lg leading-tight">
              {title}
            </Text>
            {time && (
              <Text className="text-gray font-comfortaa-medium text-xs">
                {time}
              </Text>
            )}
          </View>

          <Text
            className="text-black font-comfortaa-regular text-sm leading-tight"
            numberOfLines={1}
          >
            {subtitle}
          </Text>
        </View>

        <View className="pl-2">
          <ChevronRight color="#C7C7CC" size={20} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default NotificationCard;
