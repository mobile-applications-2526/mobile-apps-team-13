import React from "react";
import {KeyboardAvoidingView, Platform, ScrollView, Text} from "react-native";
import { WrittenInput } from "@/components/WrittenInput";
import { PressableButton } from "@/components/PressableButton";
import { Color } from "@/types/StyleOptions";
import AuthHeader from "@/components/auth/AuthHeader";
import { useTranslation } from "react-i18next";

export interface AddressData {
  streetName: string;
  houseNumber: string;
  municipality: string;
  postalCode: string;
}

type Props = {
  onNext: () => void;
  onChange: (data: AddressData) => void;
  onBack?: () => void;
  streetName?: string;
  houseNumber?: string;
  municipality?: string;
  postalCode?: string;
};

export const Step4Address = ({
  onNext,
  onChange,
  onBack,
  streetName: streetNameProp,
  houseNumber: houseNumberProp,
  municipality: municipalityProp,
  postalCode: postalCodeProp,
}: Props) => {
  const { t } = useTranslation();

  const street = streetNameProp ?? "";
  const house = houseNumberProp ?? "";
  const municipality = municipalityProp ?? "";
  const postal = postalCodeProp ?? "";

  const PostalCodeRegex = /^[1-9][0-9]{3}$/;
  const areFieldsFilled =
    street.length > 0 && municipality.length > 0 && postal.length > 0;
  const isPostalCodeValid = PostalCodeRegex.test(postal);
  const isValid = areFieldsFilled && isPostalCodeValid;

  const handleStreet = (text: string) =>
    onChange({
      streetName: text,
      houseNumber: house,
      municipality,
      postalCode: postal,
    });
  const handleHouse = (text: string) =>
    onChange({
      streetName: street,
      houseNumber: text,
      municipality,
      postalCode: postal,
    });
  const handleMunicipality = (text: string) =>
    onChange({
      streetName: street,
      houseNumber: house,
      municipality: text,
      postalCode: postal,
    });
  const handlePostal = (text: string) =>
    onChange({
      streetName: street,
      houseNumber: house,
      municipality,
      postalCode: text,
    });

  return (
      <KeyboardAvoidingView
          className="flex-1 justify-center"
      >
      <AuthHeader title={"maak een account aan"} onBack={onBack} />
      <Text className="text-[16px] text-black font-comfortaa-semibold text-center mb-2">
        {t("register.address.title")}
      </Text>
      <Text className="text-[14px] text-gray text-center font-comfortaa-medium mb-10">
        {t("register.address.subtitle")}
      </Text>

      <WrittenInput
        placeholder={t("register.address.street")}
        value={street}
        onChangeText={handleStreet}
        inputType="default"
      />

      <WrittenInput
        placeholder={t("register.address.housenumber")}
        value={house}
        onChangeText={handleHouse}
        inputType="default"
      />

      <WrittenInput
        placeholder={t("register.address.municipality")}
        value={municipality}
        onChangeText={handleMunicipality}
        inputType="default"
      />

      <WrittenInput
        placeholder={t("register.address.postalcode")}
        value={postal}
        onChangeText={handlePostal}
        inputType="default"
      />

      <PressableButton
        onPress={async () => onNext()}
        disabled={!isValid}
        title={t("register.continue")}
        background={isValid ? Color.BLUE : Color.GRAY}
      />
      </KeyboardAvoidingView>
  );
};
