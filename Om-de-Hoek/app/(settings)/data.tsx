import {
  View,
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
  Platform,
} from "react-native";
import SettingsHeader from "@/components/settings/SettingsHeader";
import Back from "@/components/Back";
import { ArrowLeft, Save } from "lucide-react-native";
import { useRouter } from "expo-router";
import LabeledInput from "@/components/settings/LabeledInput";
import { useEffect, useState } from "react";
import { useAuth } from "@/components/auth/context/AuthContext";
import UserService from "@/services/userService";
import { useTranslation } from "react-i18next";
import { Lock } from "lucide-react-native";
import { User } from "@/types/user";
import FloatingActionButton from "@/components/FloatingActionButton";

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
  const [isSaving, setIsSaving] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

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

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const userPayload: User = {
        userName: username,
        firstName,
        lastName,
        email,
        phoneNumber,
      };

      const response = await UserService.updateUser(userPayload, token!);
      if (!response.ok) {
        throw new Error("Failed to update user data");
      }

      Alert.alert("Succes", "Je gegevens zijn opgeslagen.");
    } catch (error) {
      Alert.alert("Fout", "Er ging iets mis bij het opslaan.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#100D08" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-white"
    >
      <View className="flex-1 relative">
        <ScrollView
          className="flex-1 px-6"
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        >
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
              value={username.startsWith("@") ? username : `@${username}`}
              onChange={(text) => setUsername(text.replace("@", ""))}
              editable
              isFocused={focusedField === "username"}
              onFocus={() => setFocusedField("username")}
              onBlur={() => setFocusedField(null)}
            />

            <View className="flex-row gap-3">
              <View className="flex-1">
                <LabeledInput
                  label={t("settings.data.firstname")}
                  value={firstName}
                  onChange={setFirstName}
                  editable
                  isFocused={focusedField === "firstname"}
                  onFocus={() => setFocusedField("firstname")}
                  onBlur={() => setFocusedField(null)}
                />
              </View>

              <View className="flex-1">
                <LabeledInput
                  label={t("settings.data.lastname")}
                  value={lastName}
                  onChange={setLastName}
                  editable
                  isFocused={focusedField === "lastname"}
                  onFocus={() => setFocusedField("lastname")}
                  onBlur={() => setFocusedField(null)}
                />
              </View>
            </View>

            <LabeledInput
              label={t("settings.data.email")}
              value={email}
              onChange={setEmail}
              editable
              keyboardType="email-address"
              isFocused={focusedField === "email"}
              onFocus={() => setFocusedField("email")}
              onBlur={() => setFocusedField(null)}
            />

            <View className="relative">
              <LabeledInput
                label={t("settings.data.birthdate")}
                value={birthDate}
                onChange={setBirthDate}
                editable={false}
                containerStyle="bg-gray-50 border-gray-200"
              />
              <View className="absolute right-4 top-9 items-center justify-center">
                <Lock size={16} color="#828282" />
              </View>
            </View>

            <LabeledInput
              label={t("settings.data.phone")}
              value={phoneNumber}
              onChange={setPhoneNumber}
              editable
              keyboardType="phone-pad"
              isFocused={focusedField === "phone"}
              onFocus={() => setFocusedField("phone")}
              onBlur={() => setFocusedField(null)}
            />

            <LabeledInput
              label={`${t("settings.data.address")} 1`}
              value={address1}
              onChange={setAddress1}
              editable
              isFocused={focusedField === "address1"}
              onFocus={() => setFocusedField("address1")}
              onBlur={() => setFocusedField(null)}
            />

            <LabeledInput
              label={`${t("settings.data.address")} 2`}
              value={address2}
              onChange={setAddress2}
              editable
              isFocused={focusedField === "address2"}
              onFocus={() => setFocusedField("address2")}
              onBlur={() => setFocusedField(null)}
            />
          </View>
        </ScrollView>

        <FloatingActionButton
          onPress={handleSave}
          isLoading={isSaving}
          icon={<Save color="white" size={24} />}
        />
      </View>
    </KeyboardAvoidingView>
  );
}
