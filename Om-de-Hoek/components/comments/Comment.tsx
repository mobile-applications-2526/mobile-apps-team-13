import { View, Text, Image, Alert } from "react-native";
import { Trash2 } from "lucide-react-native";
import type { Comment as CommentType } from "@/types/comment";
import { Color } from "@/types/StyleOptions";
import { useTranslation } from "react-i18next";

type Props = {
  comment: CommentType;
  currentUserTag?: string;
};

const Comment: React.FC<Props> = ({ comment, currentUserTag = "" }) => {
  const { t } = useTranslation();
  const displayName = comment.author === currentUserTag ? t("notifications.details.me") : comment.author;
  
  
  return (
    <View className="bg-white rounded-3xl p-4 mx-0 my-1"
            style={{
                shadowColor: Color.BLACK,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.05,
                shadowRadius: 5,
                elevation: 2,
            }}>

        <View className="flex-row justify-between items-start mb-1" >
          <Text className="text-blue font-comfortaa-regular">{displayName}</Text>
        </View>
        <Text className="text-black font-comfortaa-regular text-base leading-6">
            {comment.content}
        </Text>
    </View>

  );
};

export default Comment;
