import {useAuth} from "@/components/auth/context/AuthContext";
import {SafeAreaView, View, Text} from "react-native";
import {PressableButton} from "@/components/PressableButton";
import MenuItem from "@/components/settings/MenuItem";
import SettingsHeader from "@/components/settings/SettingsHeader";
import {Color} from "@/types/StyleOptions";
import { UserRoundPen, Wrench, BellRing, UsersRound } from "lucide-react-native";
import { useRouter } from "expo-router";

export default function ProfilePage() {

    const { signOut } = useAuth();
    const router = useRouter();

    return(
        <View className="flex-1 bg-white px-6">

            <SettingsHeader
                title="Jan"
                subtitle="Peeters"
            />

            <MenuItem
                icon={<UserRoundPen color="#2548BC" size={20} fill="#2548BC"/>}
                label="Mijn Gegevens"
                onPress={() => router.push("/data")}
            />

            <View className="mt-8 mb-2">
                <Text className="text-black font-comfortaa-semibold text-[14px]">Instellingen</Text>
            </View>

            <MenuItem
                icon={<Wrench color="#2548BC" size={20} fill="#2548BC"/>}
                label="Mijn Voorkeuren"
                onPress={() => router.push("/preferences")}
            />

            <MenuItem
                icon={<BellRing color="#2548BC" size={20} fill="#2548BC"/>}
                label="Mijn Meldingen"
                onPress={() => router.push("/notifications")}
            />

            <MenuItem
                icon={<UsersRound color="#2548BC" size={20} fill="#2548BC"/>}
                label="Mijn Buurten"
                onPress={() => router.push("/neighborhoods")}
            />

            <PressableButton
                onPress={signOut}
                title={"Uitloggen"}
                background={Color.RED}
            />
        </View>

    )
}