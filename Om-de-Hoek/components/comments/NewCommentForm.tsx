import { useState } from "react";
import { View, TextInput, Text, Alert, Pressable } from "react-native";
import { useAuth } from "@/components/auth/context/AuthContext";
import { useRouter } from "expo-router";
import { Send } from "lucide-react-native";
import { Color } from "@/types/StyleOptions";
import messageService from "@/services/messageService";
import { useTranslation } from "react-i18next";

type Props = {
  notificationId: string;
  currentUserTag?: string;
  onCommentPosted?: (comment: any) => void;
};

const NewCommentForm: React.FC<Props> = ({ notificationId, currentUserTag = "", onCommentPosted }) => {
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { token } = useAuth();

  const { t } = useTranslation();

  const submit = async () => {
     if (!text.trim() || !token) return;

    setSubmitting(true);
    try {
      await messageService.respondToMessage(token, {
        messageId: notificationId,
        content: text.trim(),
      });

      const newComment = { //dummy comment met zelfde input, voor display zonder opnieuw een request te maken.
        author: currentUserTag, 
        content: text.trim(),
      };

      setText("");
      onCommentPosted?.(newComment);
    } catch (error) {
      console.error("Failed to post comment:", error);
    } finally {
      setSubmitting(false);
    }
    
  };

  return (
    <View className="mt-4">
      <View className="flex-row items-center border border-gray-200 rounded-lg">
        <TextInput
          placeholder={t("notifications.details.comments.addcomment")}
          value={text}
          onChangeText={setText}
          multiline
          className="flex-1 p-3 min-h-[48px] text-black"
        />
        <Pressable
          onPress={submit}
          disabled={submitting || !text.trim()}
          className="p-3"
          style={{ opacity: submitting || !text.trim() ? 0.5 : 1 }}
        >
          <Send color={Color.BLUE} size={20} />
        </Pressable>
      </View>
    </View>
  );
};

export default NewCommentForm;
