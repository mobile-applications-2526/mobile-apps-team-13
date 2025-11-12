import {Color} from "@/types/StyleOptions";

type Props = {
    onPress: () => void;
    title: string;
    background? : Color;
    textColor?: Color;
}

import { Pressable, Text, StyleSheet } from "react-native";

export const PressableButton = ({ onPress, title, background = Color.BLUE, textColor = Color.WHITE}: Props) => {
    return(
        <Pressable
            onPress={onPress}
            className={`px-4 py-2 rounded-lg mb-4`}
            style={{ backgroundColor: background }}
        >
            <Text
                className={`font-comfortaa-regular text-center`}
                style={{ color: textColor }}
            >{title}</Text>
        </Pressable>
    );
}