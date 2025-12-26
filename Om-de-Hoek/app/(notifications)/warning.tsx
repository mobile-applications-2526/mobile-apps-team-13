import { View, Text } from "react-native";
import Header from "@/components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import Back from "@/components/Back";
import { ArrowLeft } from "lucide-react-native";
import { useRouter } from "expo-router";
import { NotificationMessage } from "@/components/NotificationMessage";
import CommentSection from "@/components/comments/CommentSection";

 
const HOME_PATH = "/";

const Warning = () => {
    const router = useRouter();

    return (
        <SafeAreaView className="flex-1 bg-white px-6">
            <View className="flex-row items-center mt-2 mb-4">
                <Back icon={<ArrowLeft color="#100D08" size={20}/>} onBack={() => router.push(HOME_PATH)}/>
                <Header title="Waarschuwing" subtitle="Marter gespot: Handboogstraat 6u37" />
            </View>
            <NotificationMessage name="Jan Peeters" content="Op bovengenoemd tijdstip is er een marter waargenomen in de Handboogstraat. De melding betreft enkel een waarneming; er is momenteel geen melding gemaakt van specifieke overlast of schade (zoals aan voertuigkabels)." />
            <CommentSection notificationId="1" />
        </SafeAreaView>
    );
}

export default Warning;