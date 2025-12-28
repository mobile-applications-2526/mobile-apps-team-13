import Back from "@/components/Back";
import { PressableButton } from "@/components/PressableButton";
import { Color } from "@/types/StyleOptions";
import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { useState } from "react";
import { View, Text, Switch, Pressable, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import Header from "@/components/Header";

type Props = {
  onChange?: (name: {
    title: string;
    content: string;
    onlyMyNeighborhood?: boolean;
    type?: "informatief" | "waarschuwing" | "noodgeval";
  }) => void;
  title?: string;
  content?: string;
  onlyMyNeighborhood?: boolean;
  type?: "informatief" | "waarschuwing" | "noodgeval";
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
    const [title, setTitle] = useState(titleProp ?? "");
    const [content, setContent] = useState(contentProp ?? "");
    const [onlyMyNeighborhood, setOnlyMyNeighborhood] = useState<boolean>(onlyMyNeighborhoodProp ?? true);
    const [selectedType, setSelectedType] = useState<'informatief' | 'waarschuwing' | 'noodgeval'>(typeProp ?? 'informatief');

    const isValid = title.length > 0 && content.length > 0;

    const handleTitleChange = (text: string) => {
        setTitle(text);
        onChange?.({ title: text, content, onlyMyNeighborhood, type: selectedType });
    };

    const handleContentChange = (text: string) => {
        setContent(text);
        onChange?.({ title, content: text, onlyMyNeighborhood, type: selectedType });
    };

    const toggleOnlyMyNeighborhood = (value: boolean) => {
        setOnlyMyNeighborhood(value);
        onChange?.({ title, content, onlyMyNeighborhood: value, type: selectedType });
    };

    const selectType = (type: 'informatief' | 'waarschuwing' | 'noodgeval') => {
        setSelectedType(type);
        onChange?.({ title, content, onlyMyNeighborhood, type });
    };

    const handleSendNotification = () => {
        
        console.log(title, content, onlyMyNeighborhood, selectedType);
        router.push(HOME_PATH);
    }


    return (
        <SafeAreaView className="flex-1 bg-white px-6">
                    <View className="relative mt-2 mb-4">
                <View className="absolute left-0">
                    <Back icon={<ArrowLeft color="#100D08" size={20}/>} onBack={() => router.push(HOME_PATH)}/>
                </View>
                <View className="items-center">
                    <Header title={t("notifications.creation.title")} subtitle={t("notifications.creation.subtitle")} />
                </View>
            </View>
            <View>
                <Text className="text-black font-comfortaa-bold">{t("notifications.creation.type")}:</Text>
                <View className="flex-row justify-between mt-2">
                    <Pressable onPress={() => selectType('informatief')}>
                        <Text className={`rounded-xl font-comfortaa-bold px-3 py-1 ${selectedType === 'informatief' ? 'text-white bg-[#2548BC] border border-[#2548BC]' : 'text-black border border-[#2548BC]'}`}>
                            {t("notifications.creation.tags.info")}
                        </Text>
                    </Pressable>
                    <Pressable onPress={() => selectType('waarschuwing')}>
                        <Text className={`rounded-xl font-comfortaa-bold px-3 py-1 ${selectedType === 'waarschuwing' ? 'text-white bg-[#2548BC] border border-[#2548BC]' : 'text-black border border-[#2548BC]'}`}>
                            {t("notifications.creation.tags.warning")}
                        </Text>
                    </Pressable>
                    <Pressable onPress={() => selectType('noodgeval')}>
                        <Text className={`rounded-xl font-comfortaa-bold px-3 py-1 ${selectedType === 'noodgeval' ? 'text-white bg-[#2548BC] border border-[#2548BC]' : 'text-black border border-[#2548BC]'}`}>
                            {t("notifications.creation.tags.emergency")}
                        </Text>
                    </Pressable>
                </View>
            </View>
            <View className="flex-row items-center mt-4">
                <Text className="text-black font-comfortaa-bold">{t("notifications.creation.neighborhood")}</Text>
                <Switch
                    value={onlyMyNeighborhood}
                    onValueChange={toggleOnlyMyNeighborhood}
                    trackColor={{ true: '#10B981', false: '#d1d5db' }}
                    thumbColor={onlyMyNeighborhood ? '#ffffff' : '#f4f3f4'}
                />
            </View>
            <View className="flex-1 mt-4">
                <View>
                    <Text className="text-black font-comfortaa-bold">{t("notifications.creation.titleinput")}</Text>
                    <TextInput
                        className="border border-gray py-3 px-4 rounded-lg mb-4 font-comfortaa-regular "
                        placeholder={t("notifications.creation.titleplaceholder")}
                        value={title}
                        onChangeText={handleTitleChange}
                    />

                    <Text className="text-black font-comfortaa-bold">{t("notifications.creation.messageinput")}</Text>
                    <TextInput
                        className="border border-gray py-3 px-4 rounded-lg mb-4 font-comfortaa-regular h-56"
                        placeholder={t("notifications.creation.messageplaceholder")}
                        placeholderTextColor="gray"
                        value={content}
                        onChangeText={handleContentChange}
                        multiline={true}
                        numberOfLines={10}
                        style={{textAlignVertical: 'top'}}
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                </View>

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
    )
};