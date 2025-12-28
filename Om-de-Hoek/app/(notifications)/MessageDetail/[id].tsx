import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import messageService from "@/services/messageService";
import { Message } from "@/types/message";
import { useAuth } from "@/components/auth/context/AuthContext";
import Back from "@/components/Back";
import { ArrowLeft } from "lucide-react-native";
import Header from "@/components/Header";
import { NotificationMessage } from "@/components/NotificationMessage";
import CommentSection from "@/components/comments/CommentSection";
import { useTranslation } from "react-i18next";

export default function MessageDetailScreen() {
  const { token } = useAuth();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [message, setMessage] = useState<Message | null>(null);
  const [loading, setLoading] = useState(true);

  const HOME_PATH = "/";
  const { t } = useTranslation();

  useEffect(() => {
    const loadMessage = async () => {
      if (!token || !id) return;
      setLoading(true);
      try {
        const data = await messageService.fetchMessageFeed(token, {
          page: 0,
          pageSize: 20,
        });
        const found = data.find((m) => m.userTag === id);
        setMessage(found || null);
      } catch (error) {
        console.error("Failed to fetch message:", error);
      } finally {
        setLoading(false);
      }
    };
    loadMessage();
  }, [id, token]);

  if (loading) return <Text className="p-4">Loading...</Text>;
  if (!message) return <Text className="p-4">Message not found</Text>;

  return (
    <ScrollView className="p-4 bg-white">
      <Text className="text-lg font-bold mb-1">{message.severity}</Text>
      <Text className="text-sm text-gray-500 mb-4">
        {new Date(message.createdAt).toLocaleString("nl-BE")}
      </Text>
      <Text className="text-base mb-4">{message.content}</Text>

      {message.reactions.length > 0 && (
        <View className="mb-4">
          <Text className="font-bold mb-1">Reactions:</Text>
          {message.reactions.map((r, i) => (
            <Text key={i} className="ml-2">
              • {r.author}: {r.content}
            </Text>
          ))}
        </View>
      )}

      <Text className="font-bold">Likes: {message.totalLikes}</Text>
       <View className="flex-row items-center mt-2 mb-4">
                <Back icon={<ArrowLeft color="#100D08" size={20}/>} onBack={() => router.push(HOME_PATH)}/>
                <Header title="Waarschuwing" subtitle="Marter gespot: Handboogstraat 6u37" />
            </View>
            <NotificationMessage name="Jan Peeters" content="Op bovengenoemd tijdstip is er een marter waargenomen in de Handboogstraat. De melding betreft enkel een waarneming; er is momenteel geen melding gemaakt van specifieke overlast of schade (zoals aan voertuigkabels)." />
            <CommentSection notificationId="1" />
    </ScrollView>
  );
}
