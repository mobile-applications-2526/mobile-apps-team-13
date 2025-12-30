import {Modal, Pressable, Text, TouchableOpacity, View} from "react-native";
import {Check, ChevronDown, ChevronRight} from "lucide-react-native";
import {useState} from "react";
import {useTranslation} from "react-i18next";
import SettingsHeader from "@/components/settings/SettingsHeader";
import LabeledInput from "@/components/settings/LabeledInput";

export default function MyPreferencesPage() {
  const { t, i18n } = useTranslation();

  const [showLanguagePicker, setShowLanguagePicker] = useState(false);

  const languages = [
    { code: "nl", label: t("settings.preferences.language.nl") },
    { code: "en", label: t("settings.preferences.language.en") },
  ];

  const changeLanguage = (code: string) => {
    i18n.changeLanguage(code);
    setShowLanguagePicker(false);
  };

  const currentLabel = t(`settings.preferences.language.${i18n.language}`);

  return (
    <View className="flex-1 bg-white">
      <View className="flex-1 px-6">
        <SettingsHeader
          title={t("settings.preferences.title")}
          subtitle={t("settings.preferences.subtitle")}
        />

        {/*  voor later, wanneer we dark mode gaan gebruiken */}
        {/*<ThemeToggle*/}
        {/*  title={t("settings.preferences.Theme")}*/}
        {/*  label={t("settings.preferences.mode")}*/}
        {/*  isEnabled={false}*/}
        {/*  onToggle={(val) => {*/}
        {/*    // Handle theme toggle*/}
        {/*  }}*/}
        {/*/>*/}
        {/* </View> */}

        <Pressable onPress={() => setShowLanguagePicker(true)}>
          <View pointerEvents="none">
            <LabeledInput
              label={t("settings.preferences.label")}
              value={currentLabel}
              dropdown={true}
              onChange={() => {}}
              rightIcon={
                showLanguagePicker ? (
                  <ChevronDown color="#828282" />
                ) : (
                  <ChevronRight color="#828282" />
                )
              }
            />
          </View>
        </Pressable>
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={showLanguagePicker}
        onRequestClose={() => setShowLanguagePicker(false)}
      >
        <Pressable
          className="flex-1 bg-black/50 justify-center items-center p-4"
          onPress={() => setShowLanguagePicker(false)}
        >
          <View className="bg-white w-full max-w-xs rounded-2xl p-4 shadow-lg">
            <Text className="text-lg font-comfortaa-bold mb-4 text-center">
              {t("settings.preferences.label")}
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
              onPress={() => setShowLanguagePicker(false)}
              className="mt-4 p-3 bg-gray-200 rounded-xl items-center"
            >
              <Text className="font-comfortaa-bold text-[#CB0000]">
                {t("settings.preferences.close")}
              </Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}
