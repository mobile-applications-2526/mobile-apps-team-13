import {KeyboardAvoidingView, Platform, ScrollView} from "react-native";
import React from "react";

export default function InputPageView({ children }: { children: React.ReactNode }) {
    return (
        <KeyboardAvoidingView
            className="bg-white"
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
                className="p-4 pt-8"
            >
                {children}
            </ScrollView>
        </KeyboardAvoidingView>
    )
}