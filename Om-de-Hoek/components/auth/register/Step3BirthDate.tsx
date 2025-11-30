import { useState } from "react";
import {
  Text,
  View,
  Platform,
  Pressable,
  ScrollView,
  Modal,
} from "react-native";
import DateTimePicker, {
  type DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { PressableButton } from "@/components/PressableButton";
import { Color } from "@/types/StyleOptions";
import AuthHeader from "@/components/auth/AuthHeader";

type Props = {
  onNext: () => void;
  onChange: (date: Date) => void;
};

export const Step3BirthDate = ({ onNext, onChange }: Props) => {
  const [birthDate, setBirthDate] = useState<Date>(new Date());
  const [showPicker, setShowPicker] = useState<boolean>(false);
  const [isDateSelected, setIsDateSelected] = useState<boolean>(false);

  const onDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (Platform.OS === "android") {
      setShowPicker(false);
    }

    if (selectedDate) {
      setBirthDate(selectedDate);
      onChange(selectedDate);
      setIsDateSelected(true);
    }
  };

  const showDatePicker = () => {
    setShowPicker(true);
  };

  const closeDatePicker = () => {
    setShowPicker(false);
  };

  const formattedDate = birthDate.toLocaleDateString("nl-NL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <ScrollView
      className="flex-1 p-6"
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
    >
      <AuthHeader title={"maak een account aan"} />
      <Text className="text-[16px] text-black font-comfortaa-semibold text-center mb-2">
        Wat is uw geboortedatum?
      </Text>
      <Text className="text-[14px] text-gray text-center font-comfortaa-medium mb-10">
        Wanneer mag u ons trakteren op taart?
      </Text>

      <Pressable onPress={showDatePicker} className="mb-4">
        <View className="border border-gray py-3 px-4 rounded-lg">
          <Text
            className={`text-base text-center font-comfortaa-regular ${isDateSelected ? "text-black" : "text-gray"}`}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {isDateSelected ? formattedDate : "Kies een datum"}
          </Text>
        </View>
      </Pressable>

      {showPicker && Platform.OS === "ios" && (
        <Modal
          transparent
          animationType="slide"
          visible={showPicker}
          onRequestClose={closeDatePicker}
        >
          <View className="flex-1 justify-end bg-black/50">
            <View className="bg-white rounded-t-3xl overflow-hidden">
              <View className="flex-row justify-between items-center px-4 py-4 border-b border-gray-200">
                <Pressable onPress={closeDatePicker}>
                  <Text className="text-red font-comfortaa-semibold text-[16px]">
                    Annuleren
                  </Text>
                </Pressable>
                <Text className="font-comfortaa-bold text-[16px] text-black">
                  Selecteer datum
                </Text>
                <Pressable onPress={closeDatePicker}>
                  <Text className="text-blue font-comfortaa-semibold text-[16px]">
                    Gereed
                  </Text>
                </Pressable>
              </View>

              <View className="items-center justify-center py-2 bg-gray-50">
                <DateTimePicker
                  testID="dateTimePicker"
                  value={birthDate}
                  mode="date"
                  display="spinner"
                  onChange={onDateChange}
                  maximumDate={new Date()}
                  textColor="'#100D08"
                  themeVariant="light"
                />
              </View>
            </View>
          </View>
        </Modal>
      )}

      {showPicker && Platform.OS === "android" && (
        <View className="my-4 bg-gray-50 rounded-lg p-2 items-center">
          <DateTimePicker
            testID="dateTimePicker"
            value={birthDate}
            mode="date"
            display="spinner"
            onChange={onDateChange}
            maximumDate={new Date()}
            textColor="#100D08"
            style={{ width: 320, height: 180 }}
          />
        </View>
      )}

      <PressableButton
        onPress={async () => onNext()}
        disabled={!isDateSelected}
        title="Verdergaan"
        background={isDateSelected ? Color.BLUE : Color.GRAY}
      />
    </ScrollView>
  );
};
