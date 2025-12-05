import { View, ActivityIndicator, KeyboardAvoidingView, ScrollView } from "react-native";
import SettingsHeader from "@/components/settings/SettingsHeader";
import Back from "@/components/Back";
import { ArrowLeft } from "lucide-react-native";
import { useRouter } from "expo-router";
import LabeledInput  from "@/components/settings/LabeledInput";
import { useEffect, useState } from "react";
import { useAuth } from "@/components/auth/context/AuthContext";
import UserService from "@/services/UserService";
import { useTranslation } from "react-i18next";


const PROFILE_PATH = "/(tabs)/profile";


export default function MyDataPage() {
    const router = useRouter();
    const { token } = useAuth();

    const [email, setEmail] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [birthDate, setBirthDate] = useState<string>("");
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [address1, setAddress1] = useState<string>("");
    const [address2, setAddress2] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const { t } = useTranslation();

    useEffect(() => {
        if (!token) return;
        
        const fetchUserData = async () => {
            try {
                const response = await UserService.loggedInuser(token);
                if (response.ok) {
                    const data = await response.json();

                                       
                    setEmail(data.email || "");
                    setUsername(data.userName || "");
                    setFirstName(data.voornaam || ""); 
                    setLastName(data.achternaam || "");
                    setBirthDate(data.birthDate || "");
                    setPhoneNumber(data.phoneNumber || "");
                    setAddress1(data.address1 || "");
                    setAddress2(data.address2 || "");
                } else {
                    console.error("API Error:", response.status);
                }
            } catch (error) {
                console.error("Failed to fetch user data", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserData();
    }, [token]);

    if (isLoading) {
        return (
            <View className="flex-1 justify-center items-center bg-white">
                <ActivityIndicator size="large" color="#100D08" />
            </View>
        );
    }

    return (
        <KeyboardAvoidingView className="flex-1 bg-white">
            <ScrollView className="flex-1 px-6">
                <View className="flex-row items-center mt-2 mb-4">
                <Back icon={<ArrowLeft color="#100D08" size={20}/>} onBack={() => router.push(PROFILE_PATH)}/>
                <SettingsHeader
                    title={t('settings.data.title')}
                    subtitle={t('settings.data.subtitle')}
                />
                </View>
                <View>
                <LabeledInput
                    label={t('settings.data.username')}
                    value={"@" + username}
                    onChange={setUsername}
                    editable={true}
                />
                <LabeledInput
                    label={t('settings.data.firstname')}
                    value={firstName}
                    onChange={setFirstName}
                    editable={true}
                />
                <LabeledInput
                    label={t('settings.data.lastname')}
                    value={lastName}
                    onChange={setLastName}
                    editable={true}
                />

                <LabeledInput
                    label={t('settings.data.email')}
                    value={email}
                    onChange={setEmail}
                    editable={true}
                />

                <LabeledInput
                    label={t('settings.data.birthdate')}
                    value={birthDate}
                    onChange={setBirthDate}
                    editable={false}
                />

                <LabeledInput
                    label={t('settings.data.phone')}
                    value={phoneNumber}
                    onChange={setPhoneNumber}
                    editable={true}
                />

                <LabeledInput
                    label={t('settings.data.address') + " 1"}
                    value={address1}
                    onChange={setAddress1}
                    editable={true}
                />

                <LabeledInput
                    label={t('settings.data.address') + " 2"}
                    value={address2}
                    onChange={setAddress2}
                    editable={true}
                />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}