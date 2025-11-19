import React, {useRef, useState} from "react";
import {RegisterBody, RegisterRequestBody} from "@/types/auth";
import PagerView from "react-native-pager-view";
import {View, KeyboardAvoidingView, Platform} from "react-native";
import {Step1Email} from "@/components/auth/register/Step1Email";
import {Step2Name} from "@/components/auth/register/Step2Name";
import {Step3BirthDate} from "@/components/auth/register/Step3BirthDate";
import {Step4Address} from "@/components/auth/register/Step4Address";
import {Step5PhoneNumber} from "@/components/auth/register/Step5PhoneNumber";
import {Step6Password} from "@/components/auth/register/Step6Password";
import {useAuth} from "@/components/auth/context/AuthContext";
import authService from "@/services/authService";
import ProgressBar from "@/components/auth/register/ProgressBar";

const totalSteps = 6;

const parseDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); //jan = 0 en moet 1 zijn
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
}

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

    const { signIn } = useAuth();

    const goToNextStep = () => {
        pagerRef.current?.setPage(huidigeIndex + 1);
    }

    const nextAndRegister = async () => { //Registerbody heeft veel te veel velden, die niet nodig zijn voor registratie volgens swagger
        const dataToRegister: RegisterRequestBody = {
            email: data.email,
            phoneNumber: data.phoneNumber || '',
            password: data.password,
            username: `${data.firstName}${data.lastName}`,
            birthDate: parseDate(data.birthDate)
        }
        console.log(dataToRegister);
        await authService.authRegister(dataToRegister);

        console.log("Registered, now logging in...");

        const loginTokens = await authService.authLogin(dataToRegister);

        console.log("Logged in, signing in...");

        await signIn(loginTokens.token, loginTokens.refreshToken);
    }

    
    const handlePageSelected = (e: any) => {
        setHuidigeIndex(e.nativeEvent.position);
    }

    return(
        <View
            className="flex-1 bg-white p-4 pt-8">

            <PagerView
                ref={pagerRef}
                style={{ flex: 1 }}
                onPageSelected={handlePageSelected}
                scrollEnabled={false}
            >

                <KeyboardAvoidingView
                    key="1"
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    className="flex-1"
                    keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 30}
                >
                    <Step1Email
                        onNext={goToNextStep}
                        onChange={(email) => setData(prevData => ({...prevData, email}))}
                    />
                </KeyboardAvoidingView>

                <KeyboardAvoidingView
                    key="2"
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    className="flex-1"
                    keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 30}
                >
                    <Step2Name
                        onNext={goToNextStep}
                        onChange={({firstName, lastName}) => setData(prevData => ({...prevData, firstName, lastName}))}
                    />
                </KeyboardAvoidingView>

                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    key="3"
                    className="flex-1"
                    keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 30}
                >
                    <Step3BirthDate
                        onNext={goToNextStep}
                        onChange={(birthDate) => setData(prevData => ({...prevData, birthDate}))}
                    />
                </KeyboardAvoidingView>

                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    key="4"
                    className="flex-1"
                    keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 30}
                >
                    <Step4Address
                        onNext={goToNextStep}
                        onChange={({ streetName, houseNumber, municipality, postalCode }) => setData(prevData => ({...prevData, streetName, houseNumber, municipality, postalCode }))}
                    />
                </KeyboardAvoidingView>

                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    key="5"
                    className="flex-1"
                    keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 30}
                >
                    <Step5PhoneNumber
                        onNext={goToNextStep}
                        onChange={(phoneNumber) => setData(prevData => ({...prevData, phoneNumber}))}
                    />
                </KeyboardAvoidingView>

                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    key="6"
                    className="flex-1"
                    keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 30}
                >
                    <Step6Password
                        onNext={nextAndRegister}
                        onChange={(password) => setData(prevData => ({...prevData, password}))}
                    />
                </KeyboardAvoidingView>
            </PagerView>
            <ProgressBar
                currentStep={huidigeIndex}
                totalSteps={totalSteps}
                />
        </View>
    )
}