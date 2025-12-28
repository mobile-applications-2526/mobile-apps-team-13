import Back from "@/components/Back";
import { PressableButton } from "@/components/PressableButton";
import { Color } from "@/types/StyleOptions";
import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { useState, useEffect } from "react";
import { View, Text, Switch, Pressable, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "@/components/auth/context/AuthContext";
import userService from "@/services/userService";
import { Neighborhoods } from "@/types/neighborhood";
import { useTranslation } from "react-i18next";
import Header from "@/components/Header";
import LabeledInput from "@/components/settings/LabeledInput";
import Dropdown from "@/components/Dropdown";
import messageService from "@/services/messageService";

type Props = {
  onChange?: (name: {
    title: string;
    content: string;
    onlyMyNeighborhood?: boolean;
    type?: "Informational" | "Warning" | "Critical";
    neighborhoodCode?: string | null;
  }) => void;
  title?: string;
  content?: string;
  onlyMyNeighborhood?: boolean;
  type?: "Informational" | "Warning" | "Critical";
};

const HOME_PATH = "/";

export default function CreateNotification({
  onChange,
  title: titleProp,
  content: contentProp,
  onlyMyNeighborhood: onlyMyNeighborhoodProp,
  type: typeProp,
}: Props)  {

    const { t } = useTranslation();
    const router = useRouter();
    const { token } = useAuth();
    const [title, setTitle] = useState(titleProp ?? "");
    const [content, setContent] = useState(contentProp ?? "");
    const [onlyMyNeighborhood, setOnlyMyNeighborhood] = useState<boolean>(onlyMyNeighborhoodProp ?? true);
    const [selectedType, setSelectedType] = useState<'Informational' | 'Warning' | 'Critical'>(typeProp ?? 'Informational');
    const [neighborhoods, setNeighborhoods] = useState<Neighborhoods[]>([]);
    const [selectedNeighborhoodCode, setSelectedNeighborhoodCode] = useState<string | null>(null);

    useEffect(() => {
        const loadUser = async () => {
            if (!token) return;
            try {
                const resp = await userService.loggedInuser(token);
                if (!resp.ok) {
                    if (resp.status === 401) {
                        console.warn("Unauthorized logged in user");
                        return;
                    }
                    throw new Error(`${resp.status}`);
                }

                const data = await resp.json();
                setNeighborhoods(data.neighborhoods ?? []);
                if ((data.neighborhoods ?? []).length > 0 && !selectedNeighborhoodCode) {
                    setSelectedNeighborhoodCode(data.neighborhoods[0].statischeSectorCode);
                }
            } catch (e) {
                console.error("Failed to load logged in user:", e);
            }
        };

        loadUser();
    }, [token]);

  const isValid = title.length > 0 && content.length > 0;

  const handleTitleChange = (text: string) => {
    setTitle(text);
    onChange?.({
      title: text,
      content,
      onlyMyNeighborhood,
      type: selectedType,
      neighborhoodCode: selectedNeighborhoodCode,
    });
  };

  const handleContentChange = (text: string) => {
    setContent(text);
    onChange?.({
      title,
      content: text,
      onlyMyNeighborhood,
      type: selectedType,
      neighborhoodCode: selectedNeighborhoodCode,
    });
  };

  const toggleOnlyMyNeighborhood = (value: boolean) => {
    setOnlyMyNeighborhood(value);
    if (value && !selectedNeighborhoodCode && neighborhoods.length > 0) { //standaard eerste buurt kiezen
      setSelectedNeighborhoodCode(neighborhoods[0].statischeSectorCode);
      onChange?.({ title, content, onlyMyNeighborhood: value, type: selectedType, neighborhoodCode: neighborhoods[0].statischeSectorCode });
      return;
    }

    onChange?.({
      title,
      content,
      onlyMyNeighborhood: value,
      type: selectedType,
      neighborhoodCode: selectedNeighborhoodCode,
    });
  };

    const selectType = (type: "Informational" | "Warning" | "Critical") => {
        setSelectedType(type);
        onChange?.({ title, content, onlyMyNeighborhood, type, neighborhoodCode: selectedNeighborhoodCode });
    };

    const handleSendNotification = async () => {
        console.log(title, content, onlyMyNeighborhood, selectedType, selectedNeighborhoodCode);
        try {
             await messageService.sendMessage(token, {
                title,
                content,
                severity: selectedType,
                neighborhoodCode: selectedNeighborhoodCode,
                neighborhoodOnly: onlyMyNeighborhood
            });
        } catch (error) {
            console.error("Failed to send message:", error);
        }

        router.push(HOME_PATH);
    }


  return (
    <SafeAreaView className="flex-1 bg-white px-6">
        <View className="relative mt-2 mb-4">
            <View className="absolute left-0">
                <Back
                icon={<ArrowLeft color="#100D08" size={20} />}
                onBack={() => router.push(HOME_PATH)}
                />
            </View>
            <View className="items-center">
                <Header
                title={t("notifications.creation.title")}
                subtitle={t("notifications.creation.subtitle")}
                />
            </View>
        </View>
        <View>
            <Text className="text-black font-comfortaa-bold">
                {t("notifications.creation.type")}:
            </Text>
            <View className="flex-row justify-between mt-2">
                <Pressable onPress={() => selectType("Informational")}>
                    <Text
                    className={`rounded-xl font-comfortaa-bold px-3 py-1 ${selectedType === "Informational" ? "text-white bg-[#2548BC] border border-[#2548BC]" : "text-black border border-[#2548BC]"}`}
                    >
                    {t("notifications.creation.tags.info")}
                    </Text>
                </Pressable>
                <Pressable onPress={() => selectType("Warning")}>
                    <Text
                    className={`rounded-xl font-comfortaa-bold px-3 py-1 ${selectedType === "Warning" ? "text-white bg-[#2548BC] border border-[#2548BC]" : "text-black border border-[#2548BC]"}`}
                    >
                    {t("notifications.creation.tags.warning")}
                    </Text>
                </Pressable>
                <Pressable onPress={() => selectType("Critical")}>
                    <Text
                    className={`rounded-xl font-comfortaa-bold px-3 py-1 ${selectedType === "Critical" ? "text-white bg-[#2548BC] border border-[#2548BC]" : "text-black border border-[#2548BC]"}`}
                    >
                    {t("notifications.creation.tags.emergency")}
                    </Text>
                </Pressable>
            </View>
        </View>
        <View className="mt-4">
        {neighborhoods.length > 0 && (
            <Dropdown
            label={t("notifications.creation.selectneighborhood")}
            options={neighborhoods.map((n) => ({ label: n.name, value: n.statischeSectorCode }))}
            value={selectedNeighborhoodCode}
            onChange={(val: string) => {
              setSelectedNeighborhoodCode(val);
              onChange?.({ title, content, onlyMyNeighborhood, type: selectedType, neighborhoodCode: val });
            }}
          />
        )}
        </View>
        <View className="flex-row items-center mt-4">
            <Text className="text-black font-comfortaa-bold">{t("notifications.creation.neighborhood")}</Text>
            <Switch
            value={onlyMyNeighborhood}
            onValueChange={toggleOnlyMyNeighborhood}
            trackColor={{ true: "#10B981", false: "#d1d5db" }}
            thumbColor={onlyMyNeighborhood ? "#ffffff" : "#f4f3f4"}
            />
        </View>
        <View className="flex-1 mt-4">
            <LabeledInput
            label={t("notifications.creation.titleinput")}
            placeholder={t("notifications.creation.titleplaceholder")}
            value={title}
            onChange={handleTitleChange}
            />

            <LabeledInput
            label={t("notifications.creation.messageinput")}
            placeholder={t("notifications.creation.messageplaceholder")}
            value={content}
            onChange={handleContentChange}
            multiline={true}
            numberOfLines={10}
            containerStyle="h-80"
            />

        <View className="mt-auto">
          <PressableButton
            onPress={async () => handleSendNotification()}
            disabled={!isValid}
            title={t("notifications.creation.submit")}
            background={isValid ? Color.BLUE : Color.GRAY}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
