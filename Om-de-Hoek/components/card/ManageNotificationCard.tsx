import { Message, MessageSeverity } from "@/types/message";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Alert,
  Modal,
  Pressable,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import LabeledInput from "../settings/LabeledInput";
import { Check, ChevronDown, ChevronRight, Trash } from "lucide-react-native";
import { Color } from "@/types/StyleOptions";

type Props = {
  notification: Message;
  isOpened: boolean;
  startEditing?: () => void;
  onChange?: (notification: Message) => void;
  onSave?: (notification: Message) => void;
  onDelete?: () => void;
  onCancel?: () => void;
};

const SEVERITY_OPTIONS: MessageSeverity[] = [
  "Informational",
  "Warning",
  "Critical",
];

const ManageNotificationCard = ({
  notification,
  isOpened,
  startEditing,
  onChange,
  onSave,
  onDelete,
  onCancel,
}: Props) => {
  const [updatedNotification, setUpdatedNotification] = useState<Message>({
    ...notification,
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [showSeverityPicker, setShowSeverityPicker] = useState<boolean>(false);

  const { t } = useTranslation();

  const updateField = (field: keyof Message, value: string) => {
    const newNotification = { ...updatedNotification, [field]: value };
    setUpdatedNotification(newNotification);
    if (onChange) onChange(newNotification);
  };

  const save = () => {
    if (onSave) onSave(updatedNotification);
  };

  const onCancelEditing = () => {
    setUpdatedNotification({ ...notification });
    if (onCancel) onCancel();
  };

  const handleDeleteWithConfirmation = () => {
    if (!onDelete) return;

    Alert.alert(t("common.sure"), t("common.notificationConfirmation"), [
      {
        text: t("common.cancel"),
        style: "cancel",
      },
      {
        text: t("common.delete"),
        style: "destructive",
        onPress: () => {
          onDelete();
        },
      },
    ]);
  };

  return (
    <View
      className="mx-2 my-2 rounded-xl bg-white shadow-sm"
      style={{
        elevation: 2,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
      }}
    >
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
                      updateField("severity", option);
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
                    {updatedNotification.severity === option && (
                      <Check size={20} color={Color.BLUE} />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      {isOpened ? (
        <View className="p-4">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-lg font-comfortaa-bold  text-black">
              {t("notifications.edit")}
            </Text>
            {onDelete && (
              <TouchableOpacity
                onPress={handleDeleteWithConfirmation}
                className="p-2"
              >
                <Trash size={20} color={Color.RED} />
              </TouchableOpacity>
            )}
          </View>
          <View className="flex-col gap-3">
            <View>
              <Pressable onPress={() => setShowSeverityPicker(true)}>
                <View pointerEvents="none">
                  <LabeledInput
                    value={t(
                      `severity.${updatedNotification.severity.toLowerCase()}`
                    )}
                    onChange={() => {}}
                    label={t("notifications.creation.severityinput")}
                    dropdown={true}
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
            <View className="flex-1">
              <LabeledInput
                value={updatedNotification.title}
                onChange={(text) => updateField("title", text)}
                label={t("notifications.creation.titleinput")}
                onFocus={() => setFocusedField("title")}
                onBlur={() => setFocusedField(null)}
                isFocused={focusedField === "title"}
              />
            </View>
            <View className="flex-1">
              <LabeledInput
                value={updatedNotification.content}
                onChange={(text) => updateField("content", text)}
                label={t("notifications.creation.messageinput")}
                onFocus={() => setFocusedField("content")}
                onBlur={() => setFocusedField(null)}
                isFocused={focusedField === "content"}
                multiline={true}
                numberOfLines={10}
                containerStyle="h-80"
              />
            </View>
          </View>

          <View className="flex-row justify-end items-center gap-4 mt-6">
            {onCancel && (
              <Pressable onPress={onCancelEditing} className="px-4 py-2">
                <Text className="font-comfortaa-semibold text-gray-500">
                  {t("common.cancel")}
                </Text>
              </Pressable>
            )}

            {onSave && (
              <Pressable
                onPress={save}
                style={{ backgroundColor: Color.BLUE }}
                className="px-6 py-2.5 rounded-full shadow-sm"
              >
                <Text className="font-comfortaa-bold text-white text-center">
                  {t("common.save")}
                </Text>
              </Pressable>
            )}
          </View>
        </View>
      ) : (
        <TouchableOpacity
          onPress={startEditing}
          className="p-4 flex-row justify-between items-center"
        >
          <View className="flex-col">
            <Text className="text-black font-comfortaa-bold text-base">
              {t(`severity.${notification.severity.toLowerCase()}`)}
            </Text>
            <Text className="text-gray font-comfortaa-semibold text-md">
              {notification.title}
            </Text>
          </View>
          <ChevronRight size={20} color="#828282" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ManageNotificationCard;
