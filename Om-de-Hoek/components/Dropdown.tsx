import React, { useState } from "react";
import { Modal, Pressable, View, Text, TouchableOpacity } from "react-native";
import { ChevronDown, Check } from "lucide-react-native";
import { Color } from "@/types/StyleOptions";
import { useTranslation } from "react-i18next";

type Option = { label: string; value: string };

type Props = {
  label: string;
  options: Option[] | string[];
  value?: string | null;
  placeholder?: string;
  onChange: (value: string) => void;
};

export default function Dropdown({ label, options, value, placeholder, onChange }: Props) {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);

  const normalized: Option[] = (options ?? []).map((o) =>
    typeof o === "string" ? { label: o, value: o } : o
  );

  const selectedLabel = normalized.find((o) => o.value === value)?.label ?? placeholder ?? normalized[0]?.label ?? "";

  return (
    <>
      <Text className="text-black mb-2 font-comfortaa-bold">{label}</Text>

      <TouchableOpacity
        onPress={() => setVisible(true)}
        className="flex-row items-center border justify-between border-black rounded-xl px-4 py-3"
      >
        <Text className="text-black font-comfortaa-regular">{selectedLabel}</Text>
        <ChevronDown size={20} color= {Color.BLUE} />
      </TouchableOpacity>

      <Modal visible={visible} transparent animationType="fade" onRequestClose={() => setVisible(false)}>
        <Pressable className="flex-1 bg-black/50 justify-center items-center p-4" onPress={() => setVisible(false)}>
          <View className="bg-white w-full max-w-xs rounded-2xl p-4 shadow-lg">
            <Text className="text-lg font-comfortaa-bold mb-4 text-center">{label}</Text>

            {normalized.map((opt) => (
              <TouchableOpacity
                key={opt.value}
                onPress={() => {
                  onChange(opt.value);
                  setVisible(false);
                }}
                className={`flex-row items-center justify-between p-4 border-b border-gray-100 ${value === opt.value ? "bg-gray-50" : ""}`}
              >
                <Text className="font-comfortaa-regular text-base">{opt.label}</Text>
                {value === opt.value && <Check size={20} color={Color.BLUE} />}
              </TouchableOpacity>
            ))}

            <TouchableOpacity onPress={() => setVisible(false)} className="mt-4 p-3 bg-gray-200 rounded-xl items-center">
              <Text className="font-comfortaa-bold text-[#CB0000]">{t("notifications.creation.close")}</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </>
  );
}
