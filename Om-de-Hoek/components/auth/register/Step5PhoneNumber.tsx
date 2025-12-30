import {useRef, useState} from "react";
import {Text, View} from "react-native";
import PhoneInput from "react-native-phone-number-input";
import {PressableButton} from "@/components/PressableButton";
import {Color} from "@/types/StyleOptions";
import AuthHeader from "@/components/auth/AuthHeader";
import {useTranslation} from "react-i18next";

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

  const [isFocused, setIsFocused] = useState(false);

  const phone = value ?? "";
  const phoneInputRef = useRef<PhoneInput>(null);

  const digitsFrom = (text: string) => text.replace(/\D/g, "");
  const digits = digitsFrom(phone);
  const isValid = digits.length >= 9;

  return (
    <View className="flex-1 justify-center">
      <AuthHeader title={"maak een account aan"} onBack={onBack} />
      <Text className="text-[16px] text-black font-comfortaa-semibold text-center mb-2">
        {t("register.phone.title")}
      </Text>
      <Text className="text-[14px] text-gray text-center font-comfortaa-medium mb-10">
        {t("register.phone.subtitle")}
      </Text>

      <View className="mb-4">
        <Text className="mb-1 font-comfortaa-regular text-[#828282] font-bold text-base ml-1">
          {t("register.phone.label")}
        </Text>

        <PhoneInput
          ref={phoneInputRef}
          value={phone}
          defaultCode="BE"
          layout="second"
          placeholder={t("register.phone.placeholder")}
          onChangeText={(text) => {
            onChange(text);
          }}
          onChangeFormattedText={(text) => {
            onChange(text);
          }}
          containerStyle={{
            width: "100%",
            backgroundColor: "#F3F4F6",
            borderRadius: 12,
            borderWidth: 2,
            borderColor: isFocused ? "#2548BC" : "transparent",
            height: 56,
            paddingVertical: 0,
          }}
          textContainerStyle={{
            backgroundColor: "transparent",
            paddingVertical: 0,
            paddingHorizontal: 0,
            borderTopRightRadius: 12,
            borderBottomRightRadius: 12,
          }}
          textInputStyle={{
            fontFamily: "comfortaa-regular",
            fontSize: 16,
            color: "#100D08",
            height: 50,
            paddingVertical: 0,
          }}
          codeTextStyle={{
            fontFamily: "comfortaa-regular",
            fontSize: 16,
            color: "#100D08",
            height: 24,
            lineHeight: 24,
          }}
          countryPickerButtonStyle={{
            width: 50,
            borderTopLeftRadius: 12,
            borderBottomLeftRadius: 12,
          }}
          textInputProps={{
            placeholderTextColor: "#828282",
            onFocus: () => setIsFocused(true),
            onBlur: () => setIsFocused(false),
            selectionColor: "#2548BC",
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
    </View>
  );
};
