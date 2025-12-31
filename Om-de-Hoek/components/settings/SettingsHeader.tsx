import { Pressable, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";

type Props = {
  title: string;
  subtitle?: string; // Dit vervangt de datum in de HomeHeader stijl
  onBack?: () => void; // Optioneel: als je iets speciaals wilt doen bij teruggaan
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
        // Fallback als er geen geschiedenis is (bv. naar home)
        router.push("/");
      }
    }
  };

  return (
    <View className="w-full px-6 pt-12 pb-4 flex-col justify-end bg-white">
      {/* Terugknop rij */}
      <View className="mb-4">
        <Pressable
          onPress={handleBack}
          // -ml-2 zorgt dat het icoon optisch uitlijnt met de tekst eronder
          // p-2 zorgt voor een groter raakvlak voor de vinger
          className="-ml-2 p-2 w-12 h-12 justify-center items-start rounded-full active:bg-gray-100"
        >
          <ArrowLeft size={32} color="black" strokeWidth={2.5} />
        </Pressable>
      </View>

      {/* Subtitel (De datum stijl van HomeHeader) */}
      {subtitle && (
        <Text className="font-comfortaa-bold text-sm text-gray uppercase tracking-widest mb-1">
          {subtitle}
        </Text>
      )}

      {/* Titel (De grote tekst stijl van HomeHeader) */}
      <Text className="font-comfortaa-bold text-4xl text-black leading-tight">
        {title}
      </Text>
    </View>
  );
}
