import {useAuth} from "@/components/auth/context/AuthContext";
import SettingsHeader from "@/components/settings/SettingsHeader";
import messageService from "@/services/messageService";
import {UnauthorizedError} from "@/types/Errors/UnauthorizedError";
import {Message, UpdateMessageCommand} from "@/types/message";
import {Color} from "@/types/StyleOptions";
import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {ActivityIndicator, Text} from "react-native";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import ManageNotificationCard from "@/components/card/ManageNotificationCard";

const manageNotifications = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [openedNotification, setOpenedNotification] = useState<
    Message | undefined
  >(undefined);

  const { t } = useTranslation();
  const { token, refreshTokens } = useAuth();

  useEffect(() => {
    const fetchMessagesByLoggedInUser = async () => {
      try {
        const fetchedMessages =
          await messageService.getAllMessagesByLoggedInUser(token!);
        setMessages(fetchedMessages);
      } catch (error) {
        console.error("Failed to fetch messages", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMessagesByLoggedInUser();
  }, [token]);

  const handleUpdateMessage = async (message: Message) => {
    const command: UpdateMessageCommand = {
      id: message.id,
      title: message.title,
      content: message.content,
      severity: message.severity,
    };
    try {
      const newMessage = await messageService.UpdateSingleMessage(
        command,
        token!
      );
      setMessages((prevMessages) =>
        prevMessages.map((msg) => (msg.id === newMessage.id ? newMessage : msg))
      );
    } catch (e) {
      if (e instanceof UnauthorizedError) {
        console.warn(
          "Error updating message: token expired, refreshing tokens"
        );
        await refreshTokens();
        const waiter = new Promise((resolve) => setTimeout(resolve, 1000));
        await waiter;
        const newMessage = await messageService.UpdateSingleMessage(
          command,
          token!
        );
        setMessages((prevMessages) =>
          prevMessages.map((msg) =>
            msg.id === newMessage.id ? newMessage : msg
          )
        );
        console.log("Tokens refreshed, message updated");
      } else {
        console.error("Error updating message:", e);
      }
    }
  };

  const handleDeleteMessage = async (messageId: string) => {
    try {
      await messageService.DeleteMessage(messageId, token!);
      setMessages((prevMessages) =>
        prevMessages.filter((msg) => msg.id !== messageId)
      );
    } catch (e) {
      if (e instanceof UnauthorizedError) {
        console.warn(
          "Error deleting message: token expired, refreshing tokens"
        );
        await refreshTokens();
        const waiter = new Promise((resolve) => setTimeout(resolve, 1000));
        await waiter;
        await messageService.DeleteMessage(messageId, token!);
        setMessages((prevMessages) =>
          prevMessages.filter((msg) => msg.id !== messageId)
        );
        console.log("Tokens refreshed, message deleted");
      } else {
        console.error("Error deleting message:", e);
      }
    }
  };

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1, backgroundColor: Color.WHITE }}
      contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 100 }}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      enableOnAndroid={true}
      extraScrollHeight={115}
    >
      <SettingsHeader
        title={t("settings.manageNotifications.title")}
        subtitle={t("settings.manageNotifications.subtitle")}
      />

      {messages.length === 0 && !isLoading && (
        <Text className="text-center font-comfortaa-medium text-base text-red mt-10">
          {t("common.notificationEmpty")}
        </Text>
      )}

      {isLoading ? (
        <ActivityIndicator size="large" color="#2548BC" animating={true} />
      ) : (
        messages.map((notification) => (
          <ManageNotificationCard
            key={notification.id}
            notification={notification}
            isOpened={openedNotification?.id === notification.id}
            startEditing={() => setOpenedNotification(notification)}
            onSave={async (updatedNotification) => {
              await handleUpdateMessage(updatedNotification);
              setOpenedNotification(undefined);
            }}
            onDelete={() => {
              handleDeleteMessage(notification.id).then();
            }}
            onCancel={() => {
              setOpenedNotification(undefined);
            }}
          />
        ))
      )}
    </KeyboardAwareScrollView>
  );
};

export default manageNotifications;
