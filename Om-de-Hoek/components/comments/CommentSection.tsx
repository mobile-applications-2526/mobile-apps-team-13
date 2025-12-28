import { useEffect, useState } from "react";
import { View, Text, FlatList, Pressable, Alert } from "react-native";
import { ChevronDown, ChevronRight } from "lucide-react-native";
import Comment from "./Comment";
import NewCommentForm from "./NewCommentForm";
import type { Comment as CommentType } from "@/types/comment";
import { useAuth } from "../auth/context/AuthContext";
import messageService from "@/services/messageService";
import Likes from "./Likes";
import { useTranslation } from "react-i18next";

type Props = {
  notificationId: string;
  initialComments: CommentType[];
  initialLikes?: number;
  initialLiked?: boolean;
  currentUserTag?: string;
  onLikeChange?: (liked: boolean, count: number) => void;
};

const CommentsSection: React.FC<Props> = ({ notificationId, initialComments, initialLikes = 0, currentUserTag = "", initialLiked = false, onLikeChange }) => {
  const [comments, setComments] = useState<CommentType[]>(initialComments);
  const [expanded, setExpanded] = useState(false);
  const [likesCount, setLikesCount] = useState<number>(initialLikes);
  const [liked, setLiked] = useState<boolean>(initialLiked);
  const { token } = useAuth();

  const { t } = useTranslation();

  useEffect(() => {
    // Voorlopige hardcoded comments
   
    const hardcoded: CommentType[] = [
      {

        author: "Jan Peeters",
        content: "Ik heb dit ook gezien, bedankt voor de melding!",
      },
      {
        
        author: "Martine Peelmans",
        content: "Is er al iemand die weet wat doen?",
      },
    ];

  }, [notificationId]);

  const handleLikeToggle = async (nextLiked: boolean, count: number) => {
    const prevLiked = liked;
    const prevCount = likesCount;


    setLiked(nextLiked);
    setLikesCount(count);
    onLikeChange?.(nextLiked, count);

    try {
      if (!token) throw new Error("No token provided");
      const updated = await messageService.likeMessage(token, notificationId);
      if (updated && typeof (updated as any).totalLikes === "number") {
        setLikesCount((updated as any).totalLikes);
      }
    } catch (e) {
      console.error("Failed to toggle like:", e);
      setLiked(prevLiked);
      setLikesCount(prevCount);
      onLikeChange?.(prevLiked, prevCount);
      Alert.alert("Fout", "Kon like niet updaten. Probeer opnieuw.");
    }
  };

  const handlePosted = (comment: CommentType) => {
    setComments(prev => [...prev, comment]);
  };

  return (
    <View className="mt-6">
      <Likes initialCount={likesCount} initialLiked={liked} onToggle={handleLikeToggle} />

      <Pressable onPress={() => setExpanded((s) => !s)} className="flex-row justify-between items-center mb-3">
        <Text className="font-comfortaa-bold text-lg text-black">{t("notifications.details.comments.comment")} ({comments.length})</Text>
        {expanded ? <ChevronDown color="#100D08" size={20} /> : <ChevronRight color="#100D08" size={20} />}
      </Pressable>

      {expanded && (
        <>
          <NewCommentForm notificationId={notificationId} onCommentPosted={handlePosted} currentUserTag={currentUserTag} />

          {comments.length === 0 ? (
            <Text className="text-gray mt-3">{t("notifications.details.comments.empty")}</Text>
          ) : (
              <View className="space-y-3">
                {comments.map((c, i) => (
                  <Comment key={i} comment={c as CommentType} currentUserTag={currentUserTag} />
                ))}
              </View>
          )}
        </>
      )}
    </View>
  );
};

export default CommentsSection;
