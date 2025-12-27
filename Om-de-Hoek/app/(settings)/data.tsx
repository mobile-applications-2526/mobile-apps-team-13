import {
  View,
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import SettingsHeader from "@/components/settings/SettingsHeader";
import Back from "@/components/Back";
import { ArrowLeft } from "lucide-react-native";
import { useRouter } from "expo-router";
import LabeledInput from "@/components/settings/LabeledInput";
import { useEffect, useState } from "react";
import { useAuth } from "@/components/auth/context/AuthContext";
import UserService from "@/services/userService";
import { useTranslation } from "react-i18next";

const PROFILE_PATH = "/(tabs)/profile";

export default function MyDataPage() {
  const router = useRouter();
  const { token } = useAuth();
  const { t } = useTranslation();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!token) return;

    const fetchUserData = async () => {
      try {
        const response = await UserService.loggedInuser(token);
        if (!response.ok) return;

        const data = await response.json();

        setEmail(data.email || "");
        setUsername(data.userName || "");
        setFirstName(data.firstName || "");
        setLastName(data.lastName || "");
        setBirthDate(data.birthDate || "");
        setPhoneNumber(data.phoneNumber || "");

        if (Array.isArray(data.addresses)) {
          setAddress1(data.addresses[0]?.fullAdress || "");
          setAddress2(data.addresses[1]?.fullAdress || "");
        } else {
          setAddress1("");
          setAddress2("");
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
          <Back
            icon={<ArrowLeft color="#100D08" size={20} />}
            onBack={() => router.push(PROFILE_PATH)}
          />
          <SettingsHeader
            title={t("settings.data.title")}
            subtitle={t("settings.data.subtitle")}
          />
        </View>

        <View>
          <LabeledInput
            label={t("settings.data.username")}
            value={`@${username}`}
            onChange={setUsername}
            editable
          />

          <LabeledInput
            label={t("settings.data.firstname")}
            value={firstName}
            onChange={setFirstName}
            editable
          />

          <LabeledInput
            label={t("settings.data.lastname")}
            value={lastName}
            onChange={setLastName}
            editable
          />

          <LabeledInput
            label={t("settings.data.email")}
            value={email}
            onChange={setEmail}
            editable
          />

          <LabeledInput
            label={t("settings.data.birthdate")}
            value={birthDate}
            onChange={setBirthDate}
            editable={false}
          />

          <LabeledInput
            label={t("settings.data.phone")}
            value={phoneNumber}
            onChange={setPhoneNumber}
            editable
          />

          <LabeledInput
            label={`${t("settings.data.address")} 1`}
            value={address1}
            onChange={setAddress1}
            editable
          />

          <LabeledInput
            label={`${t("settings.data.address")} 2`}
            value={address2}
            onChange={setAddress2}
            editable
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
