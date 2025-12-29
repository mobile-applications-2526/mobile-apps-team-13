import {View} from "react-native";
import Back from "@/components/Back";
import {ArrowLeft} from "lucide-react-native";
import SettingsTitles from "@/components/settings/SettingsTitles";
import {router} from "expo-router";

const PROFILE_PATH = "/(tabs)/profile";

type Props={
    title: string,
    subtitle: string
    onBack?: () => void,
}

const SettingsHeader = ({title, subtitle, onBack} : Props) => {
    const handleBack = () => {
        if (onBack) {
            onBack();
        }
        router.push(PROFILE_PATH);
    }

    return(
            <View className="flex-row items-center mt-2 mb-4">
                <Back
                    icon={<ArrowLeft color="#100D08" size={20} />}
                    onBack={handleBack}
                />
                <SettingsTitles
                    title={title}
                    subtitle={subtitle}
                />
            </View>
    );
}

export default SettingsHeader;
