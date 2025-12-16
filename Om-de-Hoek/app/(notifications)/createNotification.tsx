import Back from "@/components/Back";
import Header from "@/components/Header";
import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { View, Text, Switch } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


const HOME_PATH = "/";

export default function CreateNotification() {

    const router = useRouter();

    return (
        <SafeAreaView className="flex-1 bg-white px-6">
            <View className="flex-row items-center mt-2 mb-4">
                <Back icon={<ArrowLeft color="#100D08" size={20}/>} onBack={() => router.push(HOME_PATH)}/>
                <Header title="Laat van" subtitle="je horen" />
            </View>
            <View>
                <Text className="text-black font-comfortaa-bold">Type Melding:</Text>
                <View className="flex-row justify-between mt-2">
                    <Text className="text-white bg-[#2548BC] border border-[#2548BC] rounded-xl font-comfortaa-bold px-3 py-1">Informatief</Text>
                    <Text className="text-black border border-[#2548BC] rounded-xl font-comfortaa-bold px-3 py-1">Waarschuwing</Text>
                    <Text className="text-black border border-[#2548BC] rounded-xl font-comfortaa-bold px-3 py-1">Noodgeval</Text>
                </View>
            </View>
            <View className="flex-row ">
                <Text className="text-black font-comfortaa-bold mt-4">Alleen mijn buurt</Text>
                <Switch/>
            </View>
        </SafeAreaView>
    )
};