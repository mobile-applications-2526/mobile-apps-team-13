import React from "react";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";

export default function InputPageView({
  children,
}: {
  children: React.ReactNode;
}) {
    return(
        <KeyboardAwareScrollView
            style={{ flex: 1, backgroundColor: "white" }}
            contentContainerStyle={{ flexGrow: 1, paddingBottom: 100, paddingHorizontal: 24 }}
            enableOnAndroid={true}
            extraScrollHeight={20}
            showsVerticalScrollIndicator={false}
        >
            {children}
        </KeyboardAwareScrollView>
    );
}
