import React, {useRef, useState, useCallback} from "react";
import {RegisterBody} from "@/types/auth";
import PagerView from "react-native-pager-view";
import {Text, View, Image} from "react-native";
import { Stack } from "expo-router";
import {Step1Email} from "@/components/register/Step1Email";
import {Step2Name} from "@/components/register/Step2Name";
import {Step3BirthDate} from "@/components/register/Step3BirthDate";
import {Step4Address} from "@/components/register/Step4Address";
import {Step5PhoneNumber} from "@/components/register/Step5PhoneNumber";
import {Step6Password} from "@/components/register/Step6Password";
import {ProgressIndicator} from "@/components/ProgressIndicator";

const totalSteps = 6

export default function RegisterPage() {
    const [data, setData] = useState<RegisterBody>({
        email: '',
        firstName: '',
        lastName: '',
        streetName: '',
        houseNumber: '',
        municipality: '',
        postalCode: '',
        password: '',
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
                <Text className={"text-[24px] text-black font-comfortaa-semibold"}>Om de Hoek</Text>
                <Text className={"text-[11px] text-gray font-comfortaa-medium"}>"Jouw buurt, jouw mensen, jouw plek."</Text>
            </View>
            <View className="items-center my-2">
            <Image className="w-[256px] h-[256px]"
            source={require('@/assets/images/logo.png')}/>
            </View>

            <PagerView
                ref={pagerRef}
                style={{ flex: 1 }}
                scrollEnabled={false}
                onPageSelected={handlePageSelected}
            >
                <View key="1">
                    <Step1Email
                        onNext={goToNextStep}
                        onChange={(email) => setData(prevData => ({...prevData, email}))}
                    />
                </View>

                <View key="2">
                    <Step2Name
                        onNext={goToNextStep}
                        onChange={({firstName, lastName}) => setData(prevData => ({...prevData, firstName, lastName}))}
                    />
                </View>

                <View key="3">
                    <Step3BirthDate
                        onNext={goToNextStep}
                        onChange={(birthDate) => setData(prevData => ({...prevData, birthDate}))}
                    />
                </View>

                <View key="4">
                    <Step4Address
                        onNext={goToNextStep}
                        onChange={({ streetName, houseNumber, municipality, postalCode }) => setData(prevData => ({...prevData, streetName, houseNumber, municipality, postalCode }))}
                    />
                </View>

                <View key="5">
                    <Step5PhoneNumber
                        onNext={goToNextStep}
                        onChange={(phoneNumber) => setData(prevData => ({...prevData, phoneNumber}))}
                    />
                </View>

                <View key="6">
                    <Step6Password
                        onNext={goToNextStep}
                        onChange={(password) => setData(prevData => ({...prevData, password}))}
                    />
                </View>
            </PagerView>
        </View>
    )
}