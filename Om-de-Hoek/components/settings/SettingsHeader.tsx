import { Pressable, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";

type Props = {
  title: string;
  subtitle?: string;
  onBack?: () => void;
};

export default function SettingsHeader({ title, subtitle, onBack }: Props) {
  const router = useRouter();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      if (router.canGoBack()) {
        router.back();
      } else {
        router.push("/");
      }
    }
  };

  return (
    <View className="w-full px-6 pt-12 pb-4 flex-col justify-end bg-white">
      <View className="mb-4">
        <Pressable
          onPress={handleBack}
          className="-ml-2 p-2 w-12 h-12 justify-center items-start rounded-full active:bg-[#f3f4f6]"
        >
          <ArrowLeft size={32} color="black" strokeWidth={2.5} />
        </Pressable>
      </View>

      {subtitle && (
        <Text className="font-comfortaa-bold text-sm text-gray uppercase tracking-widest mb-1">
          {subtitle}
        </Text>
      )}

      <Text className="font-comfortaa-bold text-4xl text-black leading-tight">
        {title}
      </Text>
    </View>
  );
}
