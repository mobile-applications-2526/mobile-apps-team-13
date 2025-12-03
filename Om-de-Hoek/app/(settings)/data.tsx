import { View } from "react-native";
import SettingsHeader from "@/components/settings/SettingsHeader";
import Back from "@/components/Back";
import { ArrowLeft } from "lucide-react-native";
import { useRouter } from "expo-router";


const PROFILE_PATH = "/(tabs)/profile";


export default function MyDataPage() {
    const router = useRouter();


    return (
        <View className="flex-1 bg-white">
            <View className="flex-1 px-6">
                <View className="flex-row items-center mt-2 mb-4">
                <Back icon={<ArrowLeft color="#100D08" size={20}/>} onBack={() => router.push(PROFILE_PATH)}/>
                <SettingsHeader
                    title="Mijn"
                    subtitle="Gegevens"
                />
                </View>
            </View>
        </View>
    )
}