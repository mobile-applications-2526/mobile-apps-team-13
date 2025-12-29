import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { Message } from "@/types/message";
import Back from "@/components/Back";
import { ArrowLeft, Key } from "lucide-react-native";
import Header from "@/components/Header";
import { NotificationMessage } from "@/components/NotificationMessage";
import CommentSection from "@/components/comments/CommentSection";
import { useTranslation } from "react-i18next";
import userService from "@/services/userService";
import { useAuth } from "@/components/auth/context/AuthContext";

export default function MessageDetailScreen() {
  const { message: messageParam } = useLocalSearchParams<{
    message?: string;
  }>();
  const [message, setMessage] = useState<Message | null>(null);
  const [userTag, setUserTag] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const HOME_PATH = "/";
  const { t } = useTranslation();
  const { token } = useAuth();

  useEffect(() => {
    const loadMessageFromParams = () => {
      if (messageParam) {
        try {
          const parsed = JSON.parse(
            decodeURIComponent(String(messageParam))
          ) as Message; //hellyeah
          setMessage(parsed);
        } catch (e) {
          console.error("Failed to parse message param:", e);
          setMessage(null);
        } finally {
          setIsLoading(false);
        }
      } else {
        console.warn(
          "No message param provided; MessageDetail expects a 'message' route param."
        );
        setMessage(null);
      }
    };

    loadMessageFromParams();
  }, [messageParam]);

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const userData = await userService.loggedInuser(token);

        setUserTag(userData.userName);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserName();
  }, []);

  const getSeverityConfig = (severity: Message["severity"]) => {
    switch (severity) {
      case "Critical":
        return {
          title: t("notifications.creation.tags.emergency"),
        };
      case "Warning":
        return {
          title: t("notifications.creation.tags.warning"),
        };
      case "Informational":
      default:
        return {
          title: t("notifications.creation.tags.info"),
        };
    }
  };

  const getDisplayName = () => {
    if (!message) return "";
    return message.userTag === userTag
      ? t("notifications.details.me")
      : message.userTag;
  };

  if (!message)
    return <Text className="p-4">{t("notifications.details.error")}</Text>;

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#2548BC" animating={true} />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, backgroundColor: "white" }}
    >
      <ScrollView
        className="p-4 bg-white pt-12"
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="absolute left-0">
          <Back
            icon={<ArrowLeft color="#100D08" size={20} />}
            onBack={() => router.push(HOME_PATH)}
          />
        </View>
        <View className="items-center mt-2 mb-4">
          <Header
            title={getSeverityConfig(message.severity).title}
            subtitle={message.title}
          />
        </View>
        <Text className="text-sm text-gray-500 mb-4">
          {new Date(message.createdAt).toLocaleString("nl-BE")}
        </Text>
        <NotificationMessage
          name={getDisplayName()}
          content={message.content}
        />
        <CommentSection
          notificationId={message.id}
          initialComments={message.reactions}
          initialLikes={message.totalLikes}
          currentUserTag={userTag}
          initialLiked={message.likedByUser}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
