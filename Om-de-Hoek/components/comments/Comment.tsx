import { View, Text, Image, Alert } from "react-native";
import { Trash2 } from "lucide-react-native";
import type { Comment as CommentType } from "@/types/comment";
import { Color } from "@/types/StyleOptions";

type Props = {
  comment: CommentType;
  onDelete?: (id: string) => void;
  showDelete?: boolean;
};

const Comment: React.FC<Props> = ({ comment, onDelete, showDelete = false }) => {

  const handleDelete = () => {
    if (!onDelete) return;
    Alert.alert("Verwijderen", "Weet je zeker dat je deze reactie wilt verwijderen?", [
      { text: "Annuleren", style: "cancel" },
      { text: "Verwijder", style: "destructive", onPress: () => onDelete(comment.id) },
    ]);
  };


  return (
    <View className="bg-white rounded-3xl p-4 mx-0 my-1"
            style={{
                shadowColor: Color.BLACK,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.05,
                shadowRadius: 5,
                elevation: 2,
            }}>

        <View className="flex-row justify-between items-start mb-1">
          <Text className="text-gray font-comfortaa-regular">{comment.authorName}</Text>
          {showDelete && <Trash2 color="#E11D48" size={18} onPress={handleDelete} />}
        </View>

        <Text className="text-black font-comfortaa-regular text-base leading-6">
            {comment.content}
        </Text>

    </View>

  );
};

export default Comment;
