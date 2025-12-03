import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { SquarePen } from "lucide-react-native";
import { useState, useRef } from "react";

type Props = {
    label: string;
    value: string;
    onChange: (newValue: string) => void;
    editable?: boolean;
}

export default function LabeledInput({ label, value, onChange, editable = true }: Props) {
    const [isEditing, setIsEditing] = useState(false);
    const inputRef = useRef<TextInput>(null);

    const handleEditPress = () => {
        if (!editable) return; 
        
        setIsEditing(true);
        
        setTimeout(() => {
            inputRef.current?.focus();
        }, 100);
    };

    const handleBlur = () => {
        setIsEditing(false);
    };

    return(
        <View className="mb-4">
            <Text className={`mb-1 font-comfortaa-regular ${editable ? 'text-black' : 'text-gray'}`}>{label}</Text>

            <View className={`flex-row items-center border rounded-xl px-4 py-1 ${editable ? ' border-black' : 'text-gray border-gray'}`}>
                <TextInput
                    ref={inputRef}
                    className={`flex-1 font-comfortaa-regular text-black ${!editable &&'text-gray'}`}
                    value={value}
                    onChangeText={onChange}
                    editable={isEditing}
                    onBlur={handleBlur}
                />

            <TouchableOpacity onPress={handleEditPress}>
                {editable && <SquarePen size={20} color={isEditing ? "#828282" : "#100D08"} />}
            </TouchableOpacity>
            </View>
        </View>
    );
};