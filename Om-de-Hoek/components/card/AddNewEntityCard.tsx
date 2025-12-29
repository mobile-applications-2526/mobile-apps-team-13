import {TouchableOpacity, View} from "react-native";
import {Plus} from "lucide-react-native";

type Props = {
    onPress: () => void;
}

const AddNewEntityCard = ({ onPress } : Props) => {
    return (
        <TouchableOpacity
            className="mx-2 my-2 rounded-3xl bg-white p-4 shadow-sm items-center justify-center"
            style={{
                shadowColor: "#000",
                shadowOpacity: 0.05,
                shadowRadius: 5,
                shadowOffset: { width: 0, height: 2 },
                elevation: 2,
            }}
            onPress={onPress}
        >
            <View className="bg-[#F5F5F5] h-12 w-12 items-center justify-center rounded-xl">
                <Plus color="#100D08" size={24} strokeWidth={1.5} />
            </View>
        </TouchableOpacity>
    );
}

export default AddNewEntityCard;