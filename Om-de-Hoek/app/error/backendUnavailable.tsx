import {View, Text} from "react-native";

const backendUnavailable = () => {
    return (
        <View className="flex-1 bg-white px-6">
            <View className="flex-1 justify-center items-center">
                <Text className="text-center text-gray-700">
                    The backend service is currently unavailable. Please try again later.
                </Text>
            </View>
        </View>
    );
}

export default backendUnavailable;