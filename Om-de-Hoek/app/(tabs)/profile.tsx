import {useAuth} from "@/components/auth/context/AuthContext";
import {SafeAreaView, View, Text, ActivityIndicator} from "react-native";
import {PressableButton} from "@/components/PressableButton";
import MenuItem from "@/components/settings/MenuItem";
import SettingsHeader from "@/components/settings/SettingsHeader";
import {Color} from "@/types/StyleOptions";
import { UserRoundPen, Wrench, BellRing, UsersRound } from "lucide-react-native";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import UserService from "@/services/userService";
import { useTranslation } from "react-i18next";

export default function ProfilePage() {

    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const { signOut } = useAuth();
    const router = useRouter();
    const { token } = useAuth();
    const { t } = useTranslation();

    useEffect(() => {
        const fetchUserName = async () => {
            try {
                const response = await UserService.loggedInuser(token);
                if (response.ok) {
                    const data = await response.json();
                    setFirstName(data.voornaam || "");
                    setLastName(data.achternaam || "");
                }
            } catch (error) {
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
                <ActivityIndicator size="large" color="#2548BC" />
            </View>
        );
    }


    return(
        <View className="flex-1 bg-white px-6">

            <SettingsHeader
                title={firstName}
                subtitle={lastName}
            />

            <MenuItem
                icon={<UserRoundPen color="#2548BC" size={20} fill="#2548BC"/>}
                label={t('settings.mydata')}
                onPress={() => router.push("/data")}
            />

            <View className="mt-8 mb-2">
                <Text className="text-black font-comfortaa-semibold text-[14px]">{t('settings.settings')}</Text>
            </View>

            <MenuItem
                icon={<Wrench color="#2548BC" size={20} fill="#2548BC"/>}
                label={t('settings.mypreferences')}
                onPress={() => router.push("/preferences")}
            />

            <MenuItem
                icon={<BellRing color="#2548BC" size={20} fill="#2548BC"/>}
                label={t('settings.mynotifications')}
                onPress={() => router.push("/notifications")}
            />

            <MenuItem
                icon={<UsersRound color="#2548BC" size={20} fill="#2548BC"/>}
                label={t('settings.myneighborhoods')}
                onPress={() => router.push("/neighborhoods")}
            />

            <PressableButton
                onPress={signOut}
                title={t('settings.logout')}
                background={Color.RED}
            />
        </View>

    )
}