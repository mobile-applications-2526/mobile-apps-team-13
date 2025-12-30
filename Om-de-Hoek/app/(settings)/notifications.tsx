import { View, Text, Switch } from "react-native";
import SettingsTitles from "@/components/settings/SettingsTitles";
import Back from "@/components/Back";
import { ArrowLeft, Bell } from "lucide-react-native";
import { useRouter } from "expo-router";
import MenuItem from "@/components/settings/MenuItem";
import { useTranslation } from "react-i18next";
import SwitchButton from "@/components/settings/SwitchButton";

const PROFILE_PATH = "/(tabs)/profile";

export default function MyNotificationsPage() {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <View className="flex-1 bg-white px-6">
      <View className="flex-row items-center mt-2 mb-4">
        <Back
          icon={<ArrowLeft color="#100D08" size={20} />}
          onBack={() => router.push(PROFILE_PATH)}
        />
        <SettingsTitles
          title={t("settings.notifications.title")}
          subtitle={t("settings.notifications.subtitle")}
        />
      </View>
      <MenuItem
        icon={<Bell color="#2548BC" fill="#2548BC" />}
        label={t("settings.notifications.manage")}
        onPress={() => router.push("/(settings)/manageNotifications")}
      />

      <View className="mt-6 space-y-4">
        <Text className="text-black text-base font-comfortaa-bold">
          Notificaties
        </Text>
        <SwitchButton
          label="Informatief"
          value={true}
          onValueChange={() => {}}
        />
        <SwitchButton
          label="Waarschuwing"
          value={false}
          onValueChange={() => {}}
        />
        <SwitchButton label="Kritiek" value={true} onValueChange={() => {}} />
      </View>
    </View>
  );
}
