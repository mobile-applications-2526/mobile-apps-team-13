import { Text, View } from "react-native";
import SettingsTitles from "@/components/settings/SettingsTitles";
import Back from "@/components/Back";
import { ArrowLeft, Bell } from "lucide-react-native";
import { useRouter } from "expo-router";
import MenuItem from "@/components/settings/MenuItem";
import { useTranslation } from "react-i18next";
import SwitchButton from "@/components/settings/SwitchButton";
import { useEffect, useState } from "react";
import { getFromStorage, saveInStorage } from "@/utils/StorageHandler";
import SettingsHeader from "@/components/settings/SettingsHeader";

const PROFILE_PATH = "/(tabs)/profile";

export default function MyNotificationsPage() {
  const [viewInfo, setViewInfo] = useState(true);
  const [viewWarnings, setViewWarnings] = useState(true);
  const [viewCritical, setViewCritical] = useState(true);

  const router = useRouter();
  const { t } = useTranslation();

  const readPreferences = async () => {
    try {
      const infoPref = await getFromStorage("viewInfo", "true");
      const warningsPref = await getFromStorage("viewWarnings", "true");
      const criticalPref = await getFromStorage("viewCritical", "true");

      setViewInfo(infoPref === "true");
      setViewWarnings(warningsPref === "true");
      setViewCritical(criticalPref === "true");
    } catch (e) {
      console.error("Failed to fetch notification preferences.", e);
    }
  };

  const storePreference = async (key: string, value: boolean) => {
    try {
      await saveInStorage(key, JSON.stringify(value));
    } catch (e) {
      console.error("Failed to save notification preference.", e);
    }
  };

  useEffect(() => {
    readPreferences();
  }, []);

  return (
    <View className="flex-1 bg-white px-6">
      <SettingsHeader
        title={t("settings.settings")}
        subtitle={t("settings.notifications.title")}
        onBack={() => router.push("/profile")}
      />

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
          value={viewInfo}
          onValueChange={(e) => {
            setViewInfo(e);
            storePreference("viewInfo", e);
          }}
        />
        <SwitchButton
          label="Waarschuwing"
          value={viewWarnings}
          onValueChange={(e) => {
            setViewWarnings(e);
            storePreference("viewWarnings", e);
          }}
        />
        <SwitchButton
          label="Kritiek"
          value={viewCritical}
          onValueChange={(e) => {
            setViewCritical(e);
            storePreference("viewCritical", e);
          }}
        />
      </View>
    </View>
  );
}
