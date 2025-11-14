import {useState, useEffect} from "react";
import {Text, View, Platform, Pressable} from "react-native";
import DateTimePicker, {DateTimePickerEvent} from '@react-native-community/datetimepicker';
import {PressableButton} from "@/components/PressableButton";
import {Color} from "@/types/StyleOptions";

type Props = {
    onNext: () => void;
    onChange: (date: Date) => void;
    }

export const Step3BirthDate = ({onNext, onChange}: Props) => {
    const [birthDate, setBirthDate] = useState<Date>(new Date());
    const [showPicker, setShowPicker] = useState<boolean>(false);
    const [isDateSelected, setIsDateSelected] = useState<boolean>(false);

    const onDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
        setShowPicker(Platform.OS === 'ios');

        if (selectedDate) {
            setBirthDate(selectedDate);
            onChange(selectedDate);
            setIsDateSelected(true);
            }
        };

    const showDatePicker = () => {
        setShowPicker(true);
        };


    const formattedDate = birthDate.toLocaleDateString('nl-NL', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });

    return (
        <View className="flex-1 p-6">
            <Text className="text-[16px] text-black font-comfortaa-semibold text-center mb-2">
                Wat is uw geboortedatum?
            </Text>
            <Text className="text-[14px] text-gray text-center font-comfortaa-medium mb-10">
                Wanneer mag u ons trakteren op taart?
            </Text>

            <Pressable onPress={showDatePicker}>
                <View className="border border-gray-300 rounded-lg p-4 mb-4">
                    <Text className={isDateSelected ? "text-black" : "text-gray"}>
                        {isDateSelected ? formattedDate : "Kies een datum"}
                    </Text>
                </View>
            </Pressable>

            {showPicker && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={birthDate}
                    mode="date"
                    is24Hour={true}
                    display="spinner"
                    onChange={onDateChange}
                    maximumDate={new Date()}
                            />
                        )}

            <PressableButton
                onPress={async () => onNext()}
                disabled={!isDateSelected}
                title="Verdergaan"
                background={isDateSelected ? Color.BLUE : Color.GRAY}
                />
        </View>
    )
}