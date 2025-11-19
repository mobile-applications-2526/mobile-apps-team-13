import {useAuth} from "@/components/auth/context/AuthContext";
import {View} from "react-native";
import {PressableButton} from "@/components/PressableButton";
import {Color} from "@/types/StyleOptions";

export default function ProfilePage() {

    const { signOut } = useAuth();

    return(
        <View className={"flex-1 items-center justify-center bg-white"}>
            <PressableButton
                onPress={signOut}
                title={"Uitloggen"}
                background={Color.RED}
            />
        </View>
    )
}