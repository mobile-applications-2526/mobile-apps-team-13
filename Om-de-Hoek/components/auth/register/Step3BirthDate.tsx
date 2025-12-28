import { useState } from "react";
import { Text, View, Platform, Pressable, Modal } from "react-native";
import DateTimePicker, {
  type DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { PressableButton } from "@/components/PressableButton";
import { Color } from "@/types/StyleOptions";
import AuthHeader from "@/components/auth/AuthHeader";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { Calendar } from "lucide-react-native";

type Props = {
  onNext: () => void;
  onChange: (date: Date) => void;
  onBack?: () => void;
  birthDate?: Date;
};

export const Step3BirthDate = ({
  onNext,
  onChange,
  onBack,
  birthDate: birthDateProp,
}: Props) => {
  const [birthDate, setBirthDate] = useState<Date>(birthDateProp ?? new Date());
  const [showPicker, setShowPicker] = useState<boolean>(false);
  const [isDateSelected, setIsDateSelected] = useState<boolean>(
    Boolean(birthDateProp)
  );

  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (birthDateProp) {
      setBirthDate(birthDateProp);
      setIsDateSelected(true);
    }
  }, [birthDateProp]);

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

  const formattedDate = birthDate.toLocaleDateString(i18n.language, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <View className="flex-1 justify-center">
      <AuthHeader title={"maak een account aan"} onBack={onBack} />
      <Text className="text-[16px] text-black font-comfortaa-semibold text-center mb-2">
        {t("register.birthdate.title")}
      </Text>
      <Text className="text-[14px] text-gray text-center font-comfortaa-medium mb-10">
        {t("register.birthdate.subtitle")}
      </Text>

      <View className="mb-4">
        <Text className="mb-1 font-comfortaa-regular text-[#828282] font-bold text-base ml-1">
          {t("register.birthdate.birthdate")}
        </Text>

        <Pressable onPress={showDatePicker}>
          <View
            className={`
                flex-row items-center rounded-xl px-4 py-2
                bg-[#F3F4F6] border-2
                ${showPicker ? "border-[#2548BC]" : "border-transparent"}
            `}
          >
            <Text
              className={`
                flex-1 font-comfortaa-regular text-base
                ${isDateSelected ? "text-[#100D08]" : "text-[#828282]"}
              `}
              numberOfLines={1}
            >
              {isDateSelected
                ? formattedDate
                : t("register.birthdate.birthdate")}
            </Text>

            <Calendar size={20} color="#828282" />
          </View>
        </Pressable>
      </View>

      {showPicker && Platform.OS === "ios" && (
        <Modal
          transparent
          animationType="slide"
          visible={showPicker}
          onRequestClose={closeDatePicker}
        >
          <View className="flex-1 justify-end bg-black/50">
            <View className="bg-white rounded-t-3xl overflow-hidden pb-10">
              <View className="flex-row justify-between items-center px-4 py-4 border-b border-gray-200">
                <Pressable onPress={closeDatePicker}>
                  <Text className="text-red font-comfortaa-semibold text-[16px]">
                    {t("register.birthdate.datepicker.cancel")}
                  </Text>
                </Pressable>
                <Text className="font-comfortaa-bold text-[16px] text-black">
                  {t("register.birthdate.datepicker.title")}
                </Text>
                <Pressable onPress={closeDatePicker}>
                  <Text className="text-blue font-comfortaa-semibold text-[16px]">
                    {t("register.birthdate.datepicker.confirm")}
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
                  textColor="#100D08"
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
            positiveButton={{
              label: t("register.birthdate.datepicker.confirm"),
              textColor: Color.BLUE,
            }}
            negativeButton={{
              label: t("register.birthdate.datepicker.cancel"),
              textColor: Color.RED,
            }}
          />
        </View>
      )}

      <PressableButton
        onPress={async () => onNext()}
        disabled={!isDateSelected}
        title={t("register.continue")}
        background={isDateSelected ? Color.BLUE : Color.GRAY}
      />
    </View>
  );
};
