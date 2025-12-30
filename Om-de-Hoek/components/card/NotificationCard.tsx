import {useRouter} from "expo-router";
import {ChevronRight} from "lucide-react-native";
import {Text, TouchableOpacity, useWindowDimensions, View,} from "react-native";
import {Message} from "@/types/message";
import {useTranslation} from "react-i18next";

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
}: Props) => {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const { t } = useTranslation();

  const title = message.title;
  const userTag = message.userTag;

  const handlePress = () => {
    router.push(`/(notifications)/MessageDetail/${message.id}`);
  };

  const formatTime = (timeString: Date): string => {
    const date = new Date(timeString);
    const now = new Date();

    const diffInSecs = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSecs < 60) {
      return t("time.justnow");
    }
    const diffInMins = Math.floor(diffInSecs / 60);
    if (diffInMins < 60) {
      return t("time.minutesago", { count: diffInMins });
    }
    const diffInHours = Math.floor(diffInMins / 60);
    if (diffInHours < 24) {
      return t("time.hoursago", { count: diffInHours });
    }
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) {
      return t("time.daysago", { count: diffInDays });
    }
    return date.toLocaleDateString("nl-BE");
  };

  const time = message.createdAt ? formatTime(message.createdAt) : null;

  const getShortenedUserTag = () => {
    const name = `@${userTag}`;
    if (!time) return name;

    const maxLength = width < 400 ? 26 : 35;

    const timeCharWeight = 0.7;
    const effectiveTimeLength = Math.ceil(time.length * timeCharWeight);

    const allowedNameLength = maxLength - effectiveTimeLength;

    if (name.length <= allowedNameLength) {
      return name;
    }

    return name.slice(0, allowedNameLength - 3) + "...";
  };

  return (
    <TouchableOpacity
      className={`mx-0 my-2 rounded-3xl p-4 shadow-sm ${containerClass}`}
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
          <View className="flex-row items-baseline gap-2 justify-between">
            <Text className="text-black font-comfortaa-bold text-sm leading-tight">
              {getShortenedUserTag()}
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
