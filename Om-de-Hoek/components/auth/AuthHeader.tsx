import {Stack} from "expo-router";
import {Image, Text, View} from "react-native";
import React from "react";

type Props = {
    title: string;
}

export default function AuthHeader({ title }: Props) {
    return (
        <>
            <Stack.Screen options={{title}}/>
            <View className="items-center">
                <Text className={"text-[24px] text-black font-comfortaa-semibold"}>Om de Hoek</Text>
                <Text className={"text-[11px] text-gray font-comfortaa-medium"}>"Jouw buurt, jouw mensen, jouw plek."</Text>
            </View>
            <View className="items-center my-2">
                <Image source={require('@/assets/images/logo.png')} width={128} height={128}/>
            </View>
        </>
    )
}