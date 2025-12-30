import Back from "@/components/Back";
import { PressableButton } from "@/components/PressableButton";
import { Color } from "@/types/StyleOptions";
import { useRouter } from "expo-router";
import {
  ArrowLeft,
  Check,
  ChevronDown,
  ChevronRight,
} from "lucide-react-native";
import { useEffect, useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useAuth } from "@/components/auth/context/AuthContext";
import userService from "@/services/userService";
import { Neighborhood } from "@/types/neighborhood";
import { useTranslation } from "react-i18next";
import Header from "@/components/Header";
import LabeledInput from "@/components/settings/LabeledInput";
import messageService from "@/services/messageService";
import { MessageSeverity } from "@/types/message";
import SwitchButton from "@/components/settings/SwitchButton";
import InputPageView from "@/components/InputPageView";

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

const SEVERITY_OPTIONS: MessageSeverity[] = [
  "Informational",
  "Warning",
  "Critical",
];

export default function CreateNotification({
  onChange,
  title: titleProp,
  content: contentProp,
  onlyMyNeighborhood: onlyMyNeighborhoodProp,
  type: typeProp,
}: Props) {
  const { t } = useTranslation();
  const router = useRouter();
  const { token } = useAuth();
  const [title, setTitle] = useState(titleProp ?? "");
  const [content, setContent] = useState(contentProp ?? "");
  const [onlyMyNeighborhood, setOnlyMyNeighborhood] = useState<boolean>(
    onlyMyNeighborhoodProp ?? true
  );
  const [selectedType, setSelectedType] = useState<
    "Informational" | "Warning" | "Critical"
  >(typeProp ?? "Informational");
  const [neighborhoods, setNeighborhoods] = useState<Neighborhood[]>([]);
  const [selectedNeighborhoodCode, setSelectedNeighborhoodCode] = useState<
    string | null
  >(null);

  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [showSeverityPicker, setShowSeverityPicker] = useState<boolean>(false);
  const [showNeighborhoodPicker, setShowNeighborhoodPicker] =
    useState<boolean>(false);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const data = await userService.loggedInuser(token);
        setNeighborhoods(data.neighborhoods ?? []);
        if (
          (data.neighborhoods ?? []).length > 0 &&
          !selectedNeighborhoodCode
        ) {
          setSelectedNeighborhoodCode(
            data.neighborhoods[0].statischeSectorCode
          );
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
    if (value && !selectedNeighborhoodCode && neighborhoods.length > 0) {
      //standaard eerste buurt kiezen
      setSelectedNeighborhoodCode(neighborhoods[0].statischeSectorCode);
      onChange?.({
        title,
        content,
        onlyMyNeighborhood: value,
        type: selectedType,
        neighborhoodCode: neighborhoods[0].statischeSectorCode,
      });
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
    onChange?.({
      title,
      content,
      onlyMyNeighborhood,
      type,
      neighborhoodCode: selectedNeighborhoodCode,
    });
  };

  const getSelectedNeighborhoodName = () => {
    const selected = neighborhoods.find(
      (n) => n.statischeSectorCode === selectedNeighborhoodCode
    );
    return selected ? selected.name : "";
  };

  const handleSelectNeighborhood = (code: string) => {
    setSelectedNeighborhoodCode(code);
    onChange?.({
      title,
      content,
      onlyMyNeighborhood,
      type: selectedType,
      neighborhoodCode: code,
    });
  };

  const handleSendNotification = async () => {
    try {
      await messageService.sendMessage(token, {
        title,
        content,
        severity: selectedType,
        neighborhoodCode: selectedNeighborhoodCode,
        neighborhoodOnly: onlyMyNeighborhood,
      });
    } catch (error) {
      console.error("Failed to send message:", error);
    }

    router.push(HOME_PATH);
  };

  return (
    <InputPageView>
      <Modal
        visible={showSeverityPicker}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowSeverityPicker(false)}
      >
        <TouchableWithoutFeedback onPress={() => setShowSeverityPicker(false)}>
          <View className="flex-1 justify-center items-center bg-black/50 px-6">
            <TouchableWithoutFeedback>
              <View className="bg-white w-full rounded-2xl p-4 shadow-lg">
                <Text className="text-lg font-comfortaa-bold mb-4 text-center text-black">
                  {t("notifications.creation.severityinput")}
                </Text>
                {SEVERITY_OPTIONS.map((option, index) => (
                  <TouchableOpacity
                    key={option}
                    onPress={() => {
                      selectType(option);
                      setShowSeverityPicker(false);
                    }}
                    className={`py-4 flex-row justify-between items-center ${
                      index !== SEVERITY_OPTIONS.length - 1
                        ? "border-b border-gray-100"
                        : ""
                    }`}
                  >
                    <Text className="text-base font-comfortaa-regular text-black">
                      {t(`severity.${option.toLowerCase()}`)}
                    </Text>
                    {selectedType === option && (
                      <Check size={20} color={Color.BLUE} />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <Modal
        visible={showNeighborhoodPicker}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowNeighborhoodPicker(false)}
      >
        <TouchableWithoutFeedback
          onPress={() => setShowNeighborhoodPicker(false)}
        >
          <View className="flex-1 justify-center items-center bg-black/50 px-6">
            <TouchableWithoutFeedback>
              <View className="bg-white w-full rounded-2xl p-4 shadow-lg max-h-[80%]">
                <Text className="text-lg font-comfortaa-bold mb-4 text-center text-black">
                  {t("notifications.creation.selectneighborhood")}
                </Text>
                <ScrollView showsVerticalScrollIndicator={false}>
                  {neighborhoods.map((n, index) => (
                    <TouchableOpacity
                      key={n.statischeSectorCode}
                      onPress={() => {
                        handleSelectNeighborhood(n.statischeSectorCode);
                        setShowNeighborhoodPicker(false);
                      }}
                      className={`py-4 flex-row justify-between items-center ${
                        index !== neighborhoods.length - 1
                          ? "border-b border-gray-100"
                          : ""
                      }`}
                    >
                      <Text className="text-base font-comfortaa-regular text-black">
                        {n.name}
                      </Text>
                      {selectedNeighborhoodCode === n.statischeSectorCode && (
                        <Check size={20} color={Color.BLUE} />
                      )}
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <View className="relative mt-2 mb-4 items-center">
        <Header
          title={t("notifications.creation.title")}
          subtitle={t("notifications.creation.subtitle")}
          onBack={() => router.push(HOME_PATH)}
        />
      </View>
      <View>
        <Pressable onPress={() => setShowSeverityPicker(true)}>
          <View pointerEvents="none">
            <LabeledInput
              value={t(`severity.${selectedType.toLowerCase()}`)}
              label={t("notifications.creation.severityinput")}
              dropdown={true}
              onChange={() => {}}
              rightIcon={
                showSeverityPicker ? (
                  <ChevronDown color="#828282" />
                ) : (
                  <ChevronRight color="#828282" />
                )
              }
            />
          </View>
        </Pressable>
      </View>

      <View className="mt-4">
        {neighborhoods.length > 0 && (
          <Pressable onPress={() => setShowNeighborhoodPicker(true)}>
            <View pointerEvents="none">
              <LabeledInput
                value={getSelectedNeighborhoodName()}
                label={t("notifications.creation.selectneighborhood")}
                dropdown={true}
                onChange={() => {}}
                rightIcon={
                  showNeighborhoodPicker ? (
                    <ChevronDown color="#828282" />
                  ) : (
                    <ChevronRight color="#828282" />
                  )
                }
              />
            </View>
          </Pressable>
        )}
      </View>

      <SwitchButton
        label={t("notifications.creation.neighborhood")}
        value={onlyMyNeighborhood}
        onValueChange={toggleOnlyMyNeighborhood}
      />

      <View className="flex-1 mt-4">
        <LabeledInput
          label={t("notifications.creation.titleinput")}
          placeholder={t("notifications.creation.titleplaceholder")}
          value={title}
          onChange={handleTitleChange}
          isFocused={focusedField === "title"}
          onFocus={() => setFocusedField("title")}
          onBlur={() => setFocusedField(null)}
          keyboardType="default"
        />

        <LabeledInput
          label={t("notifications.creation.messageinput")}
          placeholder={t("notifications.creation.messageplaceholder")}
          value={content}
          onChange={handleContentChange}
          isFocused={focusedField === "content"}
          onFocus={() => setFocusedField("content")}
          onBlur={() => setFocusedField(null)}
          keyboardType="default"
          multiline={true}
          numberOfLines={10}
          containerStyle="h-80"
        />

        <PressableButton
          onPress={async () => handleSendNotification()}
          disabled={!isValid}
          title={t("notifications.creation.submit")}
          background={isValid ? Color.BLUE : Color.GRAY}
        />
      </View>
    </InputPageView>
  );
}
