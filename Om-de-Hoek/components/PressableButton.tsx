import { Pressable, Text } from "react-native";
import { Color } from "@/types/StyleOptions";

type Props = {
  onPress: () => Promise<void>;
  title: string;
  background?: Color;
  textColor?: Color;
  disabled?: boolean;
  borderColor?: Color;
  underlineStyle?:
    | "none"
    | "underline"
    | "line-through"
    | "underline line-through";
};

export const PressableButton = ({
  onPress,
  title,
  background = Color.BLUE,
  textColor = Color.WHITE,
  disabled = false,
  borderColor,
  underlineStyle = "none",
}: Props) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      className="px-4 py-2 rounded-lg mb-10"
      style={({ pressed }) => ({
        backgroundColor: background,
        borderColor: borderColor,
        borderWidth: borderColor ? 2 : 0,
        opacity: pressed ? 0.6 : 1,
      })}
    >
      <Text
        className="font-comfortaa-bold text-center"
        style={{
          color: textColor,
          textDecorationLine: underlineStyle,
        }}
      >
        {title}
      </Text>
    </Pressable>
  );
};
