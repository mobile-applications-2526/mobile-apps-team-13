import {Color} from "@/types/StyleOptions";

type Props = {
    onPress: () => Promise<void>;
    title: string;
    background? : Color;
    textColor?: Color;
    disabled?: boolean;
    borderColor? : Color;
}

import {Pressable, Text, GestureResponderEvent} from "react-native";

export const PressableButton = ({
                                    onPress,
                                    title,
                                    background = Color.BLUE,
                                    textColor = Color.WHITE,
                                    disabled = false,
                                    borderColor = undefined
                                }: Props) => {

    const onButtonPress = async (e: GestureResponderEvent) => {
        const button = e.currentTarget;
        button.setNativeProps({ style: { opacity: 0.6 } });
        await onPress();
        button.setNativeProps({ style: { opacity: 1 } });
    }

    return(
        <Pressable
            onPress={onButtonPress}
            className={`px-4 py-2 rounded-lg mb-4`}
            style={{
                backgroundColor: background,
                borderColor: borderColor,
                borderWidth: borderColor ? 2 : 0
            }}
            disabled={disabled}
        >
            <Text
                className={`font-comfortaa-bold text-center`}
                style={{ color: textColor }}
            >{title}</Text>
        </Pressable>
    );
}