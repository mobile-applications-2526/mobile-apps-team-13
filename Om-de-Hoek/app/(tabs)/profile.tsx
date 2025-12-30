import {useAuth} from "@/components/auth/context/AuthContext";
import {ActivityIndicator, Text, View} from "react-native";
import {PressableButton} from "@/components/PressableButton";
import MenuItem from "@/components/settings/MenuItem";
import SettingsTitles from "@/components/settings/SettingsTitles";
import {Color} from "@/types/StyleOptions";
import {BellRing, MapPin, UserRoundPen, UsersRound, Wrench,} from "lucide-react-native";
import {useRouter} from "expo-router";
import {useEffect, useState} from "react";
import UserService from "@/services/userService";
import {useTranslation} from "react-i18next";
import {UnauthorizedError} from "@/types/Errors/UnauthorizedError";

export default function ProfilePage() {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { signOut } = useAuth();
  const router = useRouter();
  const { token, refreshTokens } = useAuth();
  const { t } = useTranslation();

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const data = await UserService.loggedInuser(token);

        setFirstName(data.firstName || "");
        setLastName(data.lastName || "");
      } catch (error) {
          if (error instanceof UnauthorizedError){
                console.warn("Error fetching user data: token expired");
                await refreshTokens();
                return;
          }
        console.error("Failed to fetch user data", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserName();
  }, [token]);

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#2548BC" animating={true} />
      </View>
    );
  }

  const handleSignOut = async () => {
    router.push("/login");
    await signOut();
  };

  return (
    <View className="flex-1 bg-white px-6">
      <SettingsTitles title={firstName} subtitle={lastName} />
      <MenuItem
        icon={<UserRoundPen color="#2548BC" size={20} fill="#2548BC" />}
        label={t("settings.mydata")}
        onPress={() => router.push("/data")}
      />

      <MenuItem
        icon={<MapPin color="#2548BC" size={20} fill="#2548BC" />}
        label={t("settings.addresses.menu")}
        onPress={() => router.push("/adresses")}
      />

      <View className="mt-8 mb-2">
        <Text className="text-black font-comfortaa-semibold text-[14px]">
          {t("settings.settings")}
        </Text>
      </View>

      <MenuItem
        icon={<Wrench color="#2548BC" size={20} fill="#2548BC" />}
        label={t("settings.mypreferences")}
        onPress={() => router.push("/preferences")}
      />

      <MenuItem
        icon={<BellRing color="#2548BC" size={20} fill="#2548BC" />}
        label={t("settings.mynotifications")}
        onPress={() => router.push("/notifications")}
      />

      <MenuItem
        icon={<UsersRound color="#2548BC" size={20} fill="#2548BC" />}
        label={t("settings.myneighborhoods")}
        onPress={() => router.push("/neighborhoods")}
      />
      <View className="pt-6">
        <PressableButton
          onPress={handleSignOut}
          title={t("settings.logout")}
          background={Color.RED}
        />
      </View>
    </View>
  );
}
