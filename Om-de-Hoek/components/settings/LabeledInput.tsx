import { View, Text, TextInput, KeyboardTypeOptions } from "react-native";

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
  multiline?: boolean;
  numberOfLines?: number;
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
  multiline = false,
  numberOfLines,
}: Props) {
  return (
    <View className="mb-6">
      <Text className="mb-2 font-comfortaa-regular text-[#828282] font-bold text-base ml-1">
        {label}
      </Text>

      <View
        className={`
          flex-row rounded-xl px-4 py-2
          ${!editable ? "opacity-60" : ""}
          ${
            isFocused
              ? "bg-[#F3F4F6] border-2 border-[#2548BC]"
              : "bg-[#F3F4F6] border-2 border-transparent"
          } 
          ${containerStyle}
          ${multiline ? "items-start pt-3" : "items-center"} 
        `}
      >
        {leftIcon && (
          <View className={`mr-2 ${multiline ? "mt-1" : ""}`}>{leftIcon}</View>
        )}

        <TextInput
          className={`
            flex-1 font-comfortaa-regular text-base text-[#100D08]
            ${multiline ? "h-full" : ""}
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
          multiline={multiline}
          numberOfLines={numberOfLines}
          style={{ textAlignVertical: multiline ? "top" : "center" }}
        />

        {rightIcon && (
          <View className={`ml-2 ${multiline ? "mt-1" : ""}`}>{rightIcon}</View>
        )}
      </View>
    </View>
  );
}
