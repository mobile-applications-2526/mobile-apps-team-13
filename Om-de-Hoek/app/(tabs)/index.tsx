import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import Header from "@/components/Header";
import NotificationCard from "@/components/card/NotificationCard";
import messageService from "@/services/messageService";
import {Message, MessageSeverity} from "@/types/message";
import { Info, MessageCircle, Siren, TriangleAlert } from "lucide-react-native";
import { useAuth } from "@/components/auth/context/AuthContext";
import { useTranslation } from "react-i18next";
import FloatingActionButton from "@/components/FloatingActionButton";
import { UnauthorizedError } from "@/types/Errors/UnauthorizedError";

export default function TabTwoScreen() {
  const router = useRouter();
  const { token, refreshTokens } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation();

  const loadMessages = async () => {
    try {
      const data = await messageService.fetchMessageFeed(token, {
        page: 0,
        pageSize: 20,
      });
      setMessages(data);
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        console.log(
          "Error fetching messages: token expired, refreshing tokens"
        );
        await refreshTokens();
        console.log("Tokens refreshed, retrying to fetch messages");
        const data = await messageService.fetchMessageFeed(token, {
          page: 0,
          pageSize: 20,
        });
        setMessages(data);
      } else {
        console.error("Error fetching messages:", error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();
  }, [token]);

  const loadNextMessages = async () => {
    if (messages.length % 20 !== 0) {
      return;
    }
    const nextPage = Math.ceil(messages.length / 20);
    try {
      const data = await messageService.fetchMessageFeed(token, {
        page: nextPage,
        pageSize: 20,
      });
      setMessages((prevMessages) => [...prevMessages, ...data]);
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        console.log(
          "Error fetching messages: token expired, refreshing tokens"
        );
        await refreshTokens();
        console.log("Tokens refreshed, retrying to fetch messages");
        const data = await messageService.fetchMessageFeed(token, {
          page: nextPage,
          pageSize: 20,
        });
        setMessages((prevMessages) => [...prevMessages, ...data]);
      }
    }
  };

  const getSeverityConfig = (severity: MessageSeverity) : {
    title: string;
    icon: React.ReactNode;
    cardBackground: string;
    iconBackground: string;
  } => {
    switch (severity) {
      case "Critical":
        return {
          title: t("notifications.creation.tags.emergency"),
          icon: <Siren size={24} strokeWidth={2} color="#CB0000" />,
          cardBackground: "bg-[#FEF2F2]",
          iconBackground: "bg-[#FEE2E2]",
        };
      case "Warning":
        return {
          title: t("notifications.creation.tags.warning"),
          icon: <TriangleAlert size={24} strokeWidth={2} color="#D97706" />,
          cardBackground: "bg-[#FFFBEB]",
          iconBackground: "bg-[#FEF3C7]",
        };
      case "Informational":
      default:
        return {
          title: t("notifications.creation.tags.info"),
          icon: <Info size={24} strokeWidth={2} color="#2548BC" />,
          cardBackground: "bg-[#EFF6FF]",
          iconBackground: "bg-[#DBEAFE]",
        };
    }
  };
  return (
    <View className="flex-1 bg-white">
      <View className="items-center">
        <Header title="Place" subtitle="holder" />
      </View>

      {isLoading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#2548BC" />
        </View>
      ) : (
        <View className="mt-10 px-6 pb-20 flex-1">
          <Text className="text-gray font-comfortaa-regular mb-2">
            {t("notifications.subtitle")}
          </Text>

          {messages.length === 0 ? (
            <Text className="text-gray-500 mt-4">
              {t("notifications.empty")}
            </Text>
          ) : (
            <FlatList
              data={messages}
              renderItem={({ item }) => (
                <NotificationCard
                  key={item.id}
                  icon={getSeverityConfig(item.severity).icon}
                  message={item}
                  containerClass={getSeverityConfig(item.severity).cardBackground}
                  iconContainerClass={getSeverityConfig(item.severity).iconBackground}
                />
              )}
              onRefresh={async () => await loadMessages()}
              refreshing={isLoading}
              onEndReached={async () => await loadNextMessages()}
              onEndReachedThreshold={0.5}
              showsVerticalScrollIndicator={false}
            ></FlatList>
          )}
        </View>
      )}

      <FloatingActionButton
        onPress={() => router.push("/createNotification")}
        icon={<MessageCircle color="#FFFFFF" size={24} strokeWidth={2} />}
        isLoading={isLoading}
      />
    </View>
  );
}
