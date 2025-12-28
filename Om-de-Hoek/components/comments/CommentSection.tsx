import { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator, Alert, Pressable } from "react-native";
import { ChevronDown, ChevronRight } from "lucide-react-native";
import Comment from "./Comment";
import NewCommentForm from "./NewCommentForm";
import type { Comment as CommentType } from "@/types/comment";

type Props = {
  notificationId: string;
  initialComments?: CommentType[];
};

const CommentsSection: React.FC<Props> = ({ notificationId, initialComments = [] }) => {
  const [comments, setComments] = useState<CommentType[]>(initialComments);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    // Voorlopige hardcoded comments
   
    const hardcoded: CommentType[] = [
      {
        id: "1",
        notificationId,
        authorId: "user1",
        authorName: "Jan Peeters",
        content: "Ik heb dit ook gezien, bedankt voor de melding!",
      },
      {
        id: "2",
        notificationId,
        authorId: "user2",
        authorName: "Martine Peelmans",
        content: "Is er al iemand die weet wat doen?",
      },
    ];

    setComments(hardcoded);
    setCurrentUserId("user1");
  }, [notificationId]);


  const handleDelete = async (id: string) => {
    
  };

  const handlePosted = (comment: CommentType) => {
    
  };




  return (
    <View className="mt-6">
      <Pressable onPress={() => setExpanded((s) => !s)} className="flex-row justify-between items-center mb-3">
        <Text className="font-comfortaa-bold text-lg text-black">Comments ({comments.length})</Text>
        {expanded ? <ChevronDown color="#100D08" size={20} /> : <ChevronRight color="#100D08" size={20} />}
      </Pressable>

      {expanded && (
        <>
          <NewCommentForm notificationId={notificationId} onCommentPosted={handlePosted} />

          {comments.length === 0 ? (
            <Text className="text-gray mt-3">Nog geen reacties</Text>
          ) : (
            <FlatList
              data={comments}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <Comment comment={item as any} onDelete={handleDelete} showDelete={!!currentUserId && currentUserId === item.authorId} />
              )}
            />
          )}
        </>
      )}
    </View>
  );
};

export default CommentsSection;
