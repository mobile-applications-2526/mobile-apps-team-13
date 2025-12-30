import Header from "@/components/Header";
import {View} from "react-native";
import {useTranslation} from "react-i18next";
import NeighborhoodsWithPostalCode from "@/components/neighborhood/NeighborhoodsWithPostalCode";

type Props = {
  postalCode: string;
  onNext?: () => void;
  onBack?: () => void;
  token?: string;
};

export default function Step7Neighborhood({
  postalCode,
  onNext,
  onBack,
  token,
}: Props) {
  const { t } = useTranslation();

  return (
    <View className="flex-1 bg-white">
      <Header
        title={t("register.neighborhood.title")}
        subtitle={t("register.neighborhood.subtitle")}
        onBack={onBack}
      />
      <NeighborhoodsWithPostalCode
        postalCode={postalCode}
        token={token}
        onNext={onNext}
      />
    </View>
  );
}
