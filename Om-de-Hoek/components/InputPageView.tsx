import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function InputPageView({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <KeyboardAvoidingView
      className="bg-white"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <SafeAreaView
        style={{ flex: 1, backgroundColor: "#ffffff" }}
        edges={["top", "bottom"]}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          className="p-4"
        >
          {children}
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
