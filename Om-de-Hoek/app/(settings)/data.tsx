import { View } from "react-native";
import SettingsHeader from "@/components/settings/SettingsHeader";
import Back from "@/components/Back";
import { ArrowLeft } from "lucide-react-native";
import { useRouter } from "expo-router";
import LabeledInput  from "@/components/settings/LabeledInput";
import { useState } from "react";


const PROFILE_PATH = "/(tabs)/profile";


export default function MyDataPage() {
    const router = useRouter();

    const [email, setEmail] = useState("jan.peeters@example.com");
    const [firstName, setFirstName] = useState("Jan");
    const [lastName, setLastName] = useState("Peeters");
    const [birthDate, setBirthDate] = useState("01-01-1990");
    const [phoneNumber, setPhoneNumber] = useState("0123456789");
    const [address1, setAddress1] = useState("Hoofdstraat 1");
    const [address2, setAddress2] = useState("1234 AB, Stad");


    return (
        <View className="flex-1 bg-white">
            <View className="flex-1 px-6">
                <View className="flex-row items-center mt-2 mb-4">
                <Back icon={<ArrowLeft color="#100D08" size={20}/>} onBack={() => router.push(PROFILE_PATH)}/>
                <SettingsHeader
                    title="Mijn"
                    subtitle="Gegevens"
                />
                </View>
                <View>
                <LabeledInput
                    label="Voornaam"
                    value={firstName}
                    onChange={setFirstName}
                    editable={true}
                />
                <LabeledInput
                    label="Achternaam"
                    value={lastName}
                    onChange={setLastName}
                    editable={true}
                />

                <LabeledInput
                    label="E-mailadres"
                    value={email}
                    onChange={setEmail}
                    editable={true}
                />

                <LabeledInput
                    label="Geboortedatum"
                    value={birthDate}
                    onChange={setBirthDate}
                    editable={false}
                />

                <LabeledInput
                    label="Telefoonnummer"
                    value={phoneNumber}
                    onChange={setPhoneNumber}
                    editable={true}
                />

                <LabeledInput
                    label="Adres 1"
                    value={address1}
                    onChange={setAddress1}
                    editable={true}
                />

                <LabeledInput
                    label="Adres 2"
                    value={address2}
                    onChange={setAddress2}
                    editable={true}
                />
                </View>
            </View>
        </View>
    )
}