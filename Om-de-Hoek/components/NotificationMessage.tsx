import { View, Text } from "react-native";

type Props = {
    name: string;
    content: string;
};
export const NotificationMessage = ({ name, content }: Props) => {
    return (
        <View 
            className="bg-white rounded-3xl p-5 mx-0 my-2"
            style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.05,
                shadowRadius: 5,
                elevation: 2,
            }}
        >
            <Text className="text-gray font-comfortaa-regular mb-2">
                {name}
            </Text>

            <Text className="text-black font-comfortaa-regular text-base leading-6">
                {content}
            </Text>
        </View>
    );
};