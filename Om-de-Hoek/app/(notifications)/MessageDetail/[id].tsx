import {router, useLocalSearchParams} from "expo-router";
import {useEffect, useState} from "react";
import {ActivityIndicator, Pressable, RefreshControl, Text, View,} from "react-native";
import {Message} from "@/types/message";
import Back from "@/components/Back";
import {ArrowLeft} from "lucide-react-native";
import Header from "@/components/Header";
import {NotificationMessage} from "@/components/NotificationMessage";
import CommentSection from "@/components/comments/CommentSection";
import {useTranslation} from "react-i18next";
import userService from "@/services/userService";
import {useAuth} from "@/components/auth/context/AuthContext";
import messageService from "@/services/messageService";
import {UnauthorizedError} from "@/types/Errors/UnauthorizedError";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";

export default function MessageDetailScreen() {
  const [message, setMessage] = useState<Message | null>(null);
  const [userTag, setUserTag] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
    const [commentsExpanded, setCommentsExpanded] = useState<boolean>(false);

  const { id } = useLocalSearchParams<{
    id: string;
  }>();

  const HOME_PATH = "/";
  const { t } = useTranslation();
  const { token, refreshTokens } = useAuth();

    useEffect(() => {
        const loadInitialData = async () => {
            try {
                await Promise.all([fetchMessage(), fetchUserName()]);
            } catch (error) {
                console.error("Failed to load initial data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        loadInitialData();
    }, [isLoading]);

    const fetchUserName = async () => {
        try {
            const userData = await userService.loggedInuser(token);

            setUserTag(userData.userName);
        } catch (error) {
            console.error("Failed to fetch user data:", error);
        } finally {
            setIsLoading(false);
        }
    }

  const fetchMessage = async (counter: number = 0) => {
      try {
          if (id) {
              const messageId = Array.isArray(id) ? id[0] : id;
              const fetchedMessage = await messageService.getMessageById(token, messageId);
              setMessage({...fetchedMessage});
          }
      }
      catch (e) {
          if (e instanceof UnauthorizedError && counter < 3) {
              console.warn("Token expired, refreshing tokens...");
              await refreshTokens()
              const waiter = new Promise(resolve => setTimeout(resolve, 1000));
              await waiter;
              await fetchMessage(counter + 1);
          }
      }
  }

  const handleReload = async () => {
      setIsRefreshing(true);
      setIsLoading(true);
      await fetchMessage();
      setIsRefreshing(false);
  }

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
      : `@${message.userTag}`;
  };

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#2548BC" animating={true} />
      </View>
    );
  }

  if (!message)
    return <Text className="p-4">{t("notifications.details.error")}</Text>;

  return (
      <KeyboardAwareScrollView
        style={{ flex: 1, backgroundColor: "white" }}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 100, paddingHorizontal: 24 }}
        enableOnAndroid={true}
        extraScrollHeight={20}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={handleReload} />
        }
        keyboardShouldPersistTaps="handled"
      >
        
        <View className="mb-4">
          <Pressable
            onPress={() => router.push(HOME_PATH)}    
            className="-ml-2 p-2 w-12 h-12 justify-center items-start rounded-full active:bg-gray-100"
            >
            <ArrowLeft size={32} color="black" strokeWidth={2.5} />
          </Pressable>
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
          currentUserTag={userTag}
          message={message}
          expand={commentsExpanded}
          onExpand={() => setCommentsExpanded(!commentsExpanded)}
        />
      </KeyboardAwareScrollView>
  );
}
