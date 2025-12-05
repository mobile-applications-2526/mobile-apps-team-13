import {Alert, Modal, Pressable, View, Text, TouchableOpacity} from "react-native";
import SettingsHeader from "@/components/settings/SettingsHeader";
import Back from "@/components/Back";
import { ArrowLeft, Check } from "lucide-react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import SelectInput from "@/components/settings/SelectInput";
import ThemeToggle from "@/components/settings/ThemeToggle";
import { useTranslation } from "react-i18next";


const PROFILE_PATH = "/(tabs)/profile";


export default function MyPreferencesPage() {
    const router = useRouter();

    const { t, i18n } = useTranslation();

    const [modalVisible, setModalVisible] = useState(false);

    const languages = [
        { code: 'nl', label: t('settings.preferences.language.nl') },
        { code: 'en', label: t('settings.preferences.language.en') }
    ];

    const changeLanguage = (code: string) => {
        i18n.changeLanguage(code);
        setModalVisible(false);
    };

    const currentLabel = t(`settings.preferences.language.${i18n.language}`);

    return (
        <View className="flex-1 bg-white">
            <View className="flex-1 px-6">
                <View className="flex-row items-center mt-2 mb-4">
                <Back icon={<ArrowLeft color="#100D08" size={20}/>} onBack={() => router.push(PROFILE_PATH)}/>
                <SettingsHeader
                    title={t('settings.preferences.title')}
                    subtitle={t('settings.preferences.subtitle')}
                />
                </View>

                <View className="ml-10 mr-10">
                    <SelectInput
                        label={t('settings.preferences.label')}
                        value={currentLabel}
                        onPress={() => {
                            setModalVisible(true);
                        }}
                    />

                    <ThemeToggle
                        title={t('settings.preferences.Theme')}
                        label={t('settings.preferences.mode')}
                        isEnabled={false}
                        onToggle={(val) => {
                            // Handle theme toggle
                        }}
                    />
                </View>
            </View>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <Pressable 
                    className="flex-1 bg-black/50 justify-center items-center p-4"
                    onPress={() => setModalVisible(false)}
                >
                    <View className="bg-white w-full max-w-xs rounded-2xl p-4 shadow-lg">
                        <Text className="text-lg font-comfortaa-bold mb-4 text-center">
                            {t('settings.preferences.label')}
                        </Text>

                        {languages.map((lang) => (
                            <TouchableOpacity 
                                key={lang.code}
                                onPress={() => changeLanguage(lang.code)}
                                className={`flex-row items-center justify-between p-4 border-b border-gray-100 ${
                                    i18n.language === lang.code ? "bg-gray-50" : ""
                                }`}
                            >
                                <Text className="font-comfortaa-regular text-base">
                                    {lang.label}
                                </Text>
                                {i18n.language === lang.code && (
                                    <Check size={20} color="#2548BC" />
                                )}
                            </TouchableOpacity>
                        ))}

                        <TouchableOpacity 
                            onPress={() => setModalVisible(false)}
                            className="mt-4 p-3 bg-gray-200 rounded-xl items-center"
                        >
                            <Text className="font-comfortaa-bold text-gray-800">{t('settings.preferences.close')}</Text>
                        </TouchableOpacity>
                    </View>
                </Pressable>
            </Modal>
        </View>
    )
}