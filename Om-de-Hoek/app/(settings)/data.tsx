import { ActivityIndicator, Alert, View } from "react-native";
import {
  AtSign,
  Calendar,
  Lock,
  Mail,
  Phone,
  Save,
  User,
} from "lucide-react-native";
import LabeledInput from "@/components/settings/LabeledInput";
import { useEffect, useMemo, useState } from "react";
import { useAuth } from "@/components/auth/context/AuthContext";
import UserService from "@/services/userService";
import { useTranslation } from "react-i18next";
import { UserUpdateCommand } from "@/types/user";
import SettingsHeader from "@/components/settings/SettingsHeader";
import { Color } from "@/types/StyleOptions";
import FloatingActionButton from "@/components/FloatingActionButton";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { router } from "expo-router";

export default function MyDataPage() {
  const { token } = useAuth();
  const { t } = useTranslation();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [initialValues, setInitialValues] = useState<{ [key: string]: string }>(
    {}
  );

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await UserService.loggedInuser(token);

        const initialEmail = data.email || "";
        const initialUsername = data.userName || "";
        const initialFirstName = data.firstName || "";
        const initialLastName = data.lastName || "";
        const initialBirthDate = data.birthDate || "";
        const initialPhoneNumber = data.phoneNumber || "";

        setEmail(initialEmail);
        setUsername(initialUsername);
        setFirstName(initialFirstName);
        setLastName(initialLastName);
        setBirthDate(initialBirthDate);
        setPhoneNumber(initialPhoneNumber);

        setInitialValues({
          email: initialEmail,
          username: initialUsername,
          firstName: initialFirstName,
          lastName: initialLastName,
          phoneNumber: initialPhoneNumber,
        });
      } catch (error) {
        console.error("Failed to fetch user data", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [token]);

  const hasChanges = useMemo(() => {
    if (!initialValues) return false;

    return (
      email !== initialValues.email ||
      username !== initialValues.username ||
      firstName !== initialValues.firstName ||
      lastName !== initialValues.lastName ||
      phoneNumber !== initialValues.phoneNumber
    );
  }, [email, username, firstName, lastName, phoneNumber, initialValues]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const userPayload: UserUpdateCommand = {
        userName: username,
        firstName,
        lastName,
        email,
        phoneNumber,
      };

      await UserService.updateUser(userPayload, token!);

      setInitialValues({
        email,
        username,
        firstName,
        lastName,
        phoneNumber,
      });

      Alert.alert("Succes", "Je gegevens zijn opgeslagen.");
    } catch (error) {
      Alert.alert("Fout", "Er ging iets mis bij het opslaan.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <View className="flex-1 bg-white relative">
      <KeyboardAwareScrollView
        style={{ flex: 1, backgroundColor: Color.WHITE }}
        contentContainerStyle={{
          paddingBottom: 100,
          paddingHorizontal: 24,
        }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        enableOnAndroid={true}
        extraScrollHeight={115}
      >
        <SettingsHeader
          title={t("settings.account")}
          subtitle={t("settings.data.title")}
          onBack={() => router.push("/profile")}
        />

        {isLoading ? (
          <View className="mt-10">
            <ActivityIndicator size="large" color="#2548BC" />
          </View>
        ) : (
          <>
            <LabeledInput
              label={t("settings.data.username")}
              value={username}
              onChange={setUsername}
              editable
              isFocused={focusedField === "username"}
              onFocus={() => setFocusedField("username")}
              onBlur={() => setFocusedField(null)}
              leftIcon={<AtSign size={18} color={"#2548BC"} />}
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
                  leftIcon={<User size={18} color={"#2548BC"} />}
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
                  leftIcon={<User size={18} color={"#2548BC"} />}
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
              leftIcon={<Mail size={18} color={"#2548BC"} />}
              autoCapitalize="none"
            />

            <View className="relative">
              <LabeledInput
                label={t("settings.data.birthdate")}
                value={birthDate}
                onChange={setBirthDate}
                editable={false}
                leftIcon={<Calendar size={18} color={"#9CA3AF"} />}
              />
              <View className="absolute right-4 top-10">
                <Lock size={16} color="#9CA3AF" />
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
              leftIcon={<Phone size={18} color={"#2548BC"} />}
            />

            <FloatingActionButton
              icon={<Save color={hasChanges ? "white" : "#9CA3AF"} size={24} />}
              onPress={handleSave}
              isLoading={isSaving}
              disabled={!hasChanges || isSaving}
            />
          </>
        )}
      </KeyboardAwareScrollView>
    </View>
  );
}
