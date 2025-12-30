import {useState} from "react";
import {Alert, Pressable, Text, View} from "react-native";
import {ChevronDown, ChevronRight} from "lucide-react-native";
import Comment from "./Comment";
import NewCommentForm from "./NewCommentForm";
import type {Comment as CommentType} from "@/types/comment";
import {useAuth} from "../auth/context/AuthContext";
import messageService from "@/services/messageService";
import Likes from "./Likes";
import {useTranslation} from "react-i18next";
import {Message} from "@/types/message";

type Props = {
  currentUserTag?: string;
  message: Message;
  onLikeChange?: (liked: boolean, count: number) => void;
  expand?: boolean;
  onExpand?: () => void;
};

const CommentsSection: React.FC<Props> = ({
  currentUserTag = "",
  onLikeChange,
  message,
    expand,
    onExpand
}) => {
  const [comments, setComments] = useState<CommentType[]>(message.reactions);
  const [expanded, setExpanded] = useState(expand || false);
  const [likesCount, setLikesCount] = useState<number>(message.totalLikes);
  const [liked, setLiked] = useState<boolean>(message.likedByUser);

  const { token } = useAuth();

  const { t } = useTranslation();

  const notificationId = message.id;

  const handleLikeToggle = async (nextLiked: boolean, count: number) => {
    const prevLiked = liked;
    const prevCount = likesCount;

    setLiked(nextLiked);
    setLikesCount(count);
    onLikeChange?.(nextLiked, count);

    try {
      const updated = await messageService.likeMessage(token!, notificationId);
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
    setComments((prev) => [...prev, comment]);
  };

  const handleExpanded = () => {
      setExpanded(!expanded);
        onExpand?.();
    };

  return (
    <View className="mt-6">
      <Likes
        initialCount={likesCount}
        initialLiked={liked}
        onToggle={handleLikeToggle}
      />

      <Pressable
        onPress={handleExpanded}
        className="flex-row justify-between items-center mb-3"
      >
        <Text className="font-comfortaa-bold text-lg text-black">
          {t("notifications.details.comments.comment")} ({comments.length})
        </Text>
        {expanded ? (
          <ChevronDown color="#100D08" size={20} />
        ) : (
          <ChevronRight color="#100D08" size={20} />
        )}
      </Pressable>

      {expanded && (
        <>
          <NewCommentForm
            notificationId={notificationId}
            onCommentPosted={handlePosted}
            currentUserTag={currentUserTag}
          />

          {comments.length === 0 ? (
            <Text className="text-gray mt-3">
              {t("notifications.details.comments.empty")}
            </Text>
          ) : (
              comments.map((item, index) =>
                  <Comment
                      comment={item}
                      key={index}
                      currentUserTag={currentUserTag}
                  />
              )
          )}
        </>
      )}
    </View>
  );
};

export default CommentsSection;
