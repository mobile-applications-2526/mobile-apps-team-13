import {Pressable} from "react-native";


type Props = {
    icon: React.ReactElement;
    onBack?: () => void;
    }

export default function Back ({icon, onBack}: Props){
    return(
        <Pressable onPress={onBack} className="mr-4">
            {icon}
        </Pressable>


        )

    }