import React, {useRef, useState} from "react";
import {RegisterBody} from "@/types/auth";
import PagerView from "react-native-pager-view";
import {Text, View} from "react-native";
import { Stack } from "expo-router";
import {Step1Email} from "@/components/register/Step1Email";

export default function RegisterPage() {
    const [data, setData] = useState<RegisterBody>({
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
        birthDate: new Date(),
        phoneNumber: undefined
    })

    const [huidigeIndex, setHuidigeIndex] = useState<number>(0);

    const pagerRef = useRef<PagerView>(null);

    const goToNextStep = () => {
        pagerRef.current?.setPage(huidigeIndex + 1);
    }

    const handlePageSelected = (e: any) => {
        setHuidigeIndex(e.nativeEvent.position);
    }

    return(
        <View className="flex-1 p-4 bg-white">
            <Stack.Screen options={{title: "Maak een account"}} />

            <View className="items-center">
                <Text className={"text-2xl font-bold"}>Om de Hoek</Text>
            </View>

            <PagerView
                ref={pagerRef}
                style={{ flex: 1, marginTop: 20 }}
                scrollEnabled={false}
                onPageSelected={handlePageSelected}
            >
                <View key="1">
                    <Step1Email
                        onNext={goToNextStep}
                        onChange={(email) => setData({...data, email})}
                    />
                </View>


            </PagerView>
        </View>
    )
}