import {Color} from "@/types/StyleOptions";
import {Pressable, Text} from "react-native";
import {useState} from "react";

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
    | "underline line-through"
    | undefined;
};

export const PressableButton = ({
  onPress,
  title,
  background = Color.BLUE,
  textColor = Color.WHITE,
  disabled = false,
  borderColor = undefined,
  underlineStyle = "none",
}: Props) => {

    const [pressed, setPressed] = useState(false);

  const onButtonPress = async () => {
    setPressed(true);
    await onPress();
    setPressed(false);
  };

  return (
    <Pressable
      onPress={onButtonPress}
      className={`px-4 py-2 rounded-lg mb-10`}
      style={{
        backgroundColor: background,
        borderColor: borderColor,
        borderWidth: borderColor ? 2 : 0,
        opacity: disabled || pressed ? 0.6 : 1,
      }}
      disabled={disabled}
    >
      <Text
        className={`font-comfortaa-bold text-center`}
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
