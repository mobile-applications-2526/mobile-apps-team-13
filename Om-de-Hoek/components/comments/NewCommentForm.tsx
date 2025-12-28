import { useState } from "react";
import { View, TextInput, Text, Alert, Pressable } from "react-native";
import { useAuth } from "@/components/auth/context/AuthContext";
import { useRouter } from "expo-router";
import { Send } from "lucide-react-native";
import { Color } from "@/types/StyleOptions";

type Props = {
  notificationId: string;
  onCommentPosted?: (comment: any) => void;
};

const NewCommentForm: React.FC<Props> = ({ notificationId, onCommentPosted }) => {
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { token } = useAuth();
  const router = useRouter();

  const submit = async () => {
    
  };

  return (
    <View className="mt-4">
      <View className="flex-row items-center border border-gray-200 rounded-lg">
        <TextInput
          placeholder="Plaats een comment ..."
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
