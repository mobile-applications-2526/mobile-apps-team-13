import {ActivityIndicator, Alert, KeyboardAvoidingView, Platform, ScrollView, View,} from "react-native";
import {Lock, Save} from "lucide-react-native";
import LabeledInput from "@/components/settings/LabeledInput";
import {useEffect, useMemo, useState} from "react";
import {useAuth} from "@/components/auth/context/AuthContext";
import UserService from "@/services/userService";
import {useTranslation} from "react-i18next";
import {User} from "@/types/user";
import FloatingActionButton from "@/components/FloatingActionButton";
import SettingsHeader from "@/components/settings/SettingsHeader";

export default function MyDataPage() {
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
  const [initialValues, setInitialValues] = useState<{ [key: string]: string }>(
    {}
  );

  useEffect(() => {
    if (!token) return;

    const fetchUserData = async () => {
      try {
        const data = await UserService.loggedInuser(token);

        const initialEmail = data.email || "";
        const initialUsername = data.userName || "";
        const initialFirstName = data.firstName || "";
        const initialLastName = data.lastName || "";
        const initialBirthDate = data.birthDate || "";
        const initialPhoneNumber = data.phoneNumber || "";
        let initialAddress1 = "";
        let initialAddress2 = "";

        if (Array.isArray(data.addresses)) {
          initialAddress1 = data.addresses[0]?.fullAdress || "";
          initialAddress2 = data.addresses[1]?.fullAdress || "";
        }

        setEmail(initialEmail);
        setUsername(initialUsername);
        setFirstName(initialFirstName);
        setLastName(initialLastName);
        setBirthDate(initialBirthDate);
        setPhoneNumber(initialPhoneNumber);
        setAddress1(initialAddress1);
        setAddress2(initialAddress2);

        setInitialValues({
          email: initialEmail,
          username: initialUsername,
          firstName: initialFirstName,
          lastName: initialLastName,
          phoneNumber: initialPhoneNumber,
          address1: initialAddress1,
          address2: initialAddress2,
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
      phoneNumber !== initialValues.phoneNumber ||
      address1 !== initialValues.address1 ||
      address2 !== initialValues.address2
    );
  }, [
    email,
    username,
    firstName,
    lastName,
    phoneNumber,
    address1,
    address2,
    initialValues,
  ]);

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
            <SettingsHeader
              title={t("settings.data.title")}
              subtitle={t("settings.data.subtitle")}
            />

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
          disabled={!hasChanges}
          icon={<Save color="white" size={24} />}
        />
      </View>
    </KeyboardAvoidingView>
  );
}
