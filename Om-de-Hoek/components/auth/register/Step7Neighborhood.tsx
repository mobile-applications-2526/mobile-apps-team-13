import Header from "@/components/Header";
import { ScrollView, View } from "react-native";

import { useTranslation } from "react-i18next";
import PinnedBottomButton from "@/components/PinnedBottomButton";
import NeighborhoodsWithPostalCode from "@/components/neighborhood/NeighborhoodsWithPostalCode";
import { useState } from "react";

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
  const [counter, setCounter] = useState(0);
  const { t } = useTranslation();

  const getCounter = (count: number) => {
    setCounter(count);
  };



  return ( <>
    <ScrollView>
      <Header title={t("register.neighborhood.title")} subtitle={t("register.neighborhood.subtitle")} onBack={onBack} />
      <NeighborhoodsWithPostalCode postalCode={postalCode} token={token} retrieveCounter={getCounter} />
    </ScrollView>
    {counter > 0 && (
    <View>
       <PinnedBottomButton count={counter} onNext={onNext} />
    </View>
    )}
    </>
  );
}
