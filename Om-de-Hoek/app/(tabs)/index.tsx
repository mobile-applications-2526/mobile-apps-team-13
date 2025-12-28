import { ScrollView, Text, View, Pressable } from "react-native";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import Header from "@/components/Header";
import NotificationCard from "@/components/card/NotificationCard";
import messageService from "@/services/messageService";
import { Message } from "@/types/message";
import { TriangleAlert, Siren, Info, MessageCircle } from "lucide-react-native";
import { useAuth } from "@/components/auth/context/AuthContext";
import { useTranslation } from "react-i18next";
import FloatingActionButton from "@/components/FloatingActionButton";

export default function TabTwoScreen() {
  const router = useRouter();
  const { token } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const loadMessages = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const data = await messageService.fetchMessageFeed(token, {
        page: 0,
        pageSize: 20,
      });
      setMessages(data);
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();
  }, [token]);

  const getSeverityConfig = (severity: Message["severity"]) => {
    switch (severity) {
      case "Critical":
        return {
          title: t("notifications.creation.tags.emergency"),
          icon: <Siren size={24} strokeWidth={2} color="#100D08" />,
        };
      case "Warning":
        return {
          title: t("notifications.creation.tags.warning"),
          icon: <TriangleAlert size={24} strokeWidth={2} color="#100D08" />,
        };
      case "Informational":
      default:
        return {
          title: t("notifications.creation.tags.info"),
          icon: <Info size={24} strokeWidth={2} color="#100D08" />,
        };
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="items-center">
        <Header title="Placeholder" subtitle="Placeholder" />
      </View>

      <ScrollView className="mt-10 px-6">
        <Text className="text-gray font-comfortaa-regular mb-2">
          {t("notifications.subtitle")}
        </Text>

        {loading && messages.length === 0 && (
          <Text className="text-gray-500 mt-4">
            {t("notifications.loadmessage")}
          </Text>
        )}

        {!loading && messages.length === 0 && (
          <Text className="text-gray-500 mt-4">{t("notifications.empty")}</Text>
        )}

        {messages.map((message, index) => {
          const { icon, title } = getSeverityConfig(message.severity);
          return (
            <NotificationCard
              key={`${message.userTag}-${index}`}
              icon={icon}
              title={title}
              subtitle={message.content}
              time={new Date(message.createdAt).toLocaleTimeString("nl-BE", {
                hour: "2-digit",
                minute: "2-digit",
              })}
              message={message}
            />
          );
        })}
      </ScrollView>

      <FloatingActionButton
        onPress={() => router.push("/createNotification")}
        icon={<MessageCircle color="#FFFFFF" size={24} strokeWidth={2} />}
      />
    </SafeAreaView>
  );
}
