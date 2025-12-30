import { useRouter } from "expo-router";
import { ChevronRight } from "lucide-react-native";
import { View, Text, TouchableOpacity } from "react-native";
import { Message } from "@/types/message";

type Props = {
  icon?: React.ReactNode;
  message: Message;
  containerClass?: string;
  iconContainerClass?: string;
};

const NotificationCard: React.FC<Props> = ({
  icon,
  message,
  containerClass = "",
  iconContainerClass = "",
}) => {
  const router = useRouter();

  const title = message.title;
  const userTag = message.userTag;
  const time = new Date(message.createdAt).toLocaleString("nl-BE");

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
      className={`mx-0 my-2 rounded-3xl bg-white p-4 shadow-sm ${containerClass}`}
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
          <View
            className={`h-12 w-12 items-center justify-center rounded-xl ${iconContainerClass}`}
          >
            {icon}
          </View>
        </View>

        <View className="flex-1 justify-center gap-0.5">
          <View className="flex-row items-baseline gap-2">
            <Text className="text-black font-comfortaa-bold text-lg leading-tight">
              @{userTag}
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
            {title}
          </Text>
        </View>

        <View className="pl-2">
          <ChevronRight color="#828282" size={20} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default NotificationCard;
