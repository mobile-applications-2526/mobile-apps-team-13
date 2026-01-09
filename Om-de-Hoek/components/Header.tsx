import { Pressable, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { useTranslation } from "react-i18next";

type Props = {
  title: string;
  subtitle?: string;
  category?: string;
  badgeStyle?: {
    backgroundColor: string;
    textColor: string;
  };
  date?: Date;
  onBack?: () => void;
};

export default function Header({
  title,
  subtitle,
  category,
  badgeStyle,
  date,
  onBack,
}: Props) {
  const router = useRouter();
  const { i18n } = useTranslation();

  const handleBack = () => {
    if (onBack) onBack();
    else router.canGoBack() ? router.back() : router.push("/");
  };

  const formattedDate = date
    ? new Date(date).toLocaleString(i18n.language, {
        day: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
      })
    : null;

  const showMetaRow = (category && badgeStyle) || formattedDate;

  return (
    <View className="w-full px-6 pt-12 pb-6 flex-col bg-white">
      <View className="mb-6">
        <Pressable
          onPress={handleBack}
          className="-ml-2 p-2 w-10 h-10 justify-center items-center rounded-full active:bg-[#f3f4f6]"
        >
          <ArrowLeft size={28} color="black" strokeWidth={2.5} />
        </Pressable>
      </View>

      {showMetaRow && (
        <View className="flex-row items-center mb-3">
          {category && badgeStyle && (
            <View
              className={`px-3 py-1 rounded-full self-start mr-3 ${badgeStyle.backgroundColor}`}
            >
              <Text
                className={`text-xs font-comfortaa-bold uppercase tracking-wider ${badgeStyle.textColor}`}
              >
                {category}
              </Text>
            </View>
          )}

          {formattedDate && (
            <Text className="text-xs text-gray font-comfortaa-bold">
              {formattedDate}
            </Text>
          )}
        </View>
      )}

      {subtitle && (
        <Text className="font-comfortaa-bold text-sm text-gray uppercase tracking-widest mb-1">
          {subtitle}
        </Text>
      )}

      <Text className="font-comfortaa-bold text-2xl text-black leading-tight">
        {title}
      </Text>
    </View>
  );
}
