import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import messageService from "@/services/messageService";
import { Message } from "@/types/message";
import { useAuth } from "@/components/auth/context/AuthContext";

export default function MessageDetailScreen() {
  const { token } = useAuth();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [message, setMessage] = useState<Message | null>(null);
  const [loading, setLoading] = useState(true);

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
    </ScrollView>
  );
}
