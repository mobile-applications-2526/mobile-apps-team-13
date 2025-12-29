import { useState } from "react";
import { View, TextInput, Text, Alert, Pressable } from "react-native";
import { useAuth } from "@/components/auth/context/AuthContext";
import { useRouter } from "expo-router";
import { Send } from "lucide-react-native";
import { Color } from "@/types/StyleOptions";
import messageService from "@/services/messageService";
import { useTranslation } from "react-i18next";
import LabeledInput from "../settings/LabeledInput";

type Props = {
  notificationId: string;
  currentUserTag?: string;
  onCommentPosted?: (comment: any) => void;
};

const NewCommentForm: React.FC<Props> = ({
  notificationId,
  currentUserTag = "",
  onCommentPosted,
}) => {
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { token } = useAuth();
  const [isFocused, setIsFocused] = useState(false);

  const { t } = useTranslation();

  const submit = async () => {
    if (!text.trim() || !token) return;

    setSubmitting(true);
    try {
      await messageService.respondToMessage(token, {
        messageId: notificationId,
        content: text.trim(),
      });

      const newComment = {
        //dummy comment met zelfde input, voor display zonder opnieuw een request te maken.
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
    <LabeledInput
      placeholder={t("notifications.details.comments.addcomment")}
      value={text}
      onChange={setText}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      isFocused={isFocused}
      rightIcon={
        <Send
          color={submitting || !text.trim() ? "#828282" : Color.BLUE}
          size={20}
        />
      }
      pressableRight
      onRightIconPress={submit}
      editable={!submitting}
    />
  );
};

export default NewCommentForm;
