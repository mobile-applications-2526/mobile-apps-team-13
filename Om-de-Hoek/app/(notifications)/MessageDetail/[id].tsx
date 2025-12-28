import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { Message } from "@/types/message";
import Back from "@/components/Back";
import { ArrowLeft } from "lucide-react-native";
import Header from "@/components/Header";
import { NotificationMessage } from "@/components/NotificationMessage";
import CommentSection from "@/components/comments/CommentSection";
import { useTranslation } from "react-i18next";

export default function MessageDetailScreen() {
  
  const {message: messageParam } = useLocalSearchParams<{ message?: string }>();
  const [message, setMessage] = useState<Message | null>(null);

  const HOME_PATH = "/";
  const { t } = useTranslation();

  useEffect(() => {
    const loadMessageFromParams = () => {
      if (messageParam) {
        try {
          const parsed = JSON.parse(decodeURIComponent(String(messageParam))) as Message; //hellyeah
          console.log("Loaded message from params:", parsed);
          setMessage(parsed);
        } catch (e) {
          console.error("Failed to parse message param:", e);
          setMessage(null);
        }
      } else {
        console.warn("No message param provided; MessageDetail expects a 'message' route param.");
        setMessage(null);
      }
    };

    loadMessageFromParams();
  }, [messageParam]);

  const getSeverityConfig = (severity: Message["severity"]) => {
    switch (severity) {
      case "Critical":
        return {
          title: t("notifications.creation.tags.emergency")
        };
      case "Warning":
        return {
          title: t("notifications.creation.tags.warning")
        };
      case "Informational":
      default:
        return {
          title: t("notifications.creation.tags.info")
        };
    }
  };

  if (!message) return <Text className="p-4">{t("notifications.details.error")}</Text>;

  return (
    <ScrollView className="p-4 bg-white">
       <View className="flex-row items-center mt-2 mb-4">
                <Back icon={<ArrowLeft color="#100D08" size={20}/>} onBack={() => router.push(HOME_PATH)}/>
                <Header title={getSeverityConfig(message.severity).title} subtitle={message.title} />
            </View>
            <Text className="text-sm text-gray-500 mb-4">
        {new Date(message.createdAt).toLocaleString("nl-BE")}
      </Text>
            <NotificationMessage name={message.userName} content={message.content} />
            <CommentSection notificationId={message.id} initialComments={message.reactions} initialLikes={message.totalLikes} />
    </ScrollView>
  );
}
