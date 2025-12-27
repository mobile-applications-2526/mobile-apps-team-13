import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardTypeOptions,
} from "react-native";
import { SquarePen } from "lucide-react-native";
import { useState, useRef } from "react";

type Props = {
  label?: string;
  value: string;
  onChange: (newValue: string) => void;
  editable?: boolean;
  isFocused?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
  keyboardType?: KeyboardTypeOptions;
  containerStyle?: string;
  placeholder?: string;
  secureTextEntry?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
};

export default function LabeledInput({
  label,
  value,
  onChange,
  editable = true,
  isFocused = false,
  onFocus,
  onBlur,
  keyboardType = "default",
  containerStyle = "",
  placeholder,
  secureTextEntry = false,
  leftIcon,
  rightIcon,
}: Props) {
  return (
    <View className="mb-6">
      {/* Label blijft hetzelfde */}
      <Text className="mb-2 font-comfortaa-regular text-[#828282] font-bold text-base ml-1">
        {label}
      </Text>

      <View
        className={`
          flex-row items-center rounded-xl px-4 py-2
          ${!editable ? "opacity-60" : ""}
          ${/* Hier is de magie: Grijze achtergrond, blauwe border ALLEEN bij focus */ ""}
          ${
            isFocused
              ? "bg-[#F3F4F6] border-2 border-[#2548BC]"
              : "bg-[#F3F4F6] border-2 border-transparent"
          } 
          ${containerStyle}
        `}
      >
        {leftIcon && <View className="mr-2">{leftIcon}</View>}
        <TextInput
          className={`
            flex-1 font-comfortaa-regular text-base text-[#100D08]
          `}
          value={value}
          onChangeText={onChange}
          editable={editable}
          onFocus={onFocus}
          onBlur={onBlur}
          keyboardType={keyboardType}
          placeholder={placeholder}
          placeholderTextColor="#828282"
          secureTextEntry={secureTextEntry}
        />
        {rightIcon && <View className="ml-2">{rightIcon}</View>}
      </View>
    </View>
  );
}
