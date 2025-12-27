import { useRef, useState } from "react";
import { KeyboardAvoidingView, Platform, Text, View } from "react-native";
import PhoneInput from "react-native-phone-number-input";
import { PressableButton } from "@/components/PressableButton";
import { Color } from "@/types/StyleOptions";
import AuthHeader from "@/components/auth/AuthHeader";
import { useTranslation } from "react-i18next";

type Props = {
  onNext: () => void;
  onChange: (formattedPhoneNumber: string) => void;
  onBack?: () => void;
  value?: string;
};

export const Step5PhoneNumber = ({
  onNext,
  onChange,
  onBack,
  value,
}: Props) => {
  const { t } = useTranslation();

  // 1. State voor de blauwe border focus
  const [isFocused, setIsFocused] = useState(false);

  const phone = value ?? "";
  const phoneInputRef = useRef<PhoneInput>(null);

  const digitsFrom = (text: string) => text.replace(/\D/g, "");
  const digits = digitsFrom(phone);
  // Validatie: Pas aan naar jouw wensen (bv. minstens 9 cijfers)
  const isValid = digits.length >= 9;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 justify-center"
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 30}
    >
      <AuthHeader title={"maak een account aan"} onBack={onBack} />
      <Text className="text-[16px] text-black font-comfortaa-semibold text-center mb-2">
        {t("register.phone.title")}
      </Text>
      <Text className="text-[14px] text-gray text-center font-comfortaa-medium mb-10">
        {t("register.phone.subtitle")}
      </Text>

      {/* Wrapper View voor spacing (zoals mb-4 in LabeledInput) */}
      <View className="mb-4">
        {/* 2. Het Label (Precies zoals LabeledInput) */}
        <Text className="mb-1 font-comfortaa-regular text-[#828282] font-bold text-base ml-1">
          {t("register.phone.label")}
        </Text>

        {/* 3. De PhoneInput met gemapte styles */}
        <PhoneInput
          ref={phoneInputRef}
          value={phone}
          defaultCode="BE"
          layout="second"
          placeholder={t("register.phone.placeholder")} // Placeholder tekst
          onChangeText={(text) => {
            onChange(text);
          }}
          onChangeFormattedText={(text) => {
            onChange(text);
          }}
          // Container Style: Hier regelen we de achtergrond, border en ronding
          containerStyle={{
            width: "100%",
            backgroundColor: "#F3F4F6", // Zelfde als bg-[#F3F4F6]
            borderRadius: 12, // Zelfde als rounded-xl
            borderWidth: 2, // Zelfde als border-2
            borderColor: isFocused ? "#2548BC" : "transparent", // De focus logica
            height: 56, // Hoogte iets bijstellen zodat het past bij de rest
            paddingVertical: 0,
          }}
          // Text Container: Moet transparant zijn zodat de parent kleur erdoorheen komt
          textContainerStyle={{
            backgroundColor: "transparent",
            paddingVertical: 0,
            paddingHorizontal: 0,
            borderTopRightRadius: 12,
            borderBottomRightRadius: 12,
          }}
          // Input Veld: Het font en de tekstkleur
          textInputStyle={{
            fontFamily: "comfortaa-regular",
            fontSize: 16,
            color: "#100D08", // Jouw zwart
            height: 50,
            paddingVertical: 0, // Belangrijk voor uitlijning
          }}
          // Code Text (+32): Het font en de tekstkleur
          codeTextStyle={{
            fontFamily: "comfortaa-regular",
            fontSize: 16,
            color: "#100D08", // Jouw zwart
            height: 24, // Fix voor alignment
            lineHeight: 24,
          }}
          // Country Picker Knopje
          countryPickerButtonStyle={{
            width: 50,
            borderTopLeftRadius: 12,
            borderBottomLeftRadius: 12,
          }}
          // 4. Props doorgeven aan de onderliggende TextInput voor Focus/Blur
          textInputProps={{
            placeholderTextColor: "#828282", // Jouw grijs
            onFocus: () => setIsFocused(true),
            onBlur: () => setIsFocused(false),
            selectionColor: "#2548BC", // Cursor kleur blauw maken
          }}
          withDarkTheme={false}
          withShadow={false}
          autoFocus={false}
        />
      </View>

      <PressableButton
        onPress={async () => onNext()}
        disabled={false}
        title={t("register.continue")}
        background={Color.BLUE}
      />
    </KeyboardAvoidingView>
  );
};
