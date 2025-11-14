import { Text, View, Image } from "react-native";
import { useState } from "react";
import { fetchGemeenteByPostcode } from "@/services/gemeenteService";
import {PressableButton} from "@/components/PressableButton";
import {Color} from "@/types/StyleOptions";
import {Link} from "expo-router"

export default function TabTwoScreen() {
  const [gemeente, setGemeente] = useState<string>("");
  const [postcode, _] = useState<string>("3000");

  const handleFetchGemeente = async () => {
    const result = await fetchGemeenteByPostcode(postcode, "Nl");
    if (result) {
      setGemeente(result[0].naam);
    } else {
      setGemeente("Gemeente niet gevonden");
    }
  };

  return (
    <View className="flex-1 items-center justify-center bg-white">
    <Image source={require('@/assets/images/logo.png')}/>
      <Text className="text-2xl font-comfortaa-regular font-bold mb-4">
        Magic !!!
      </Text>

      <PressableButton
        onPress={handleFetchGemeente}
        title="Klik hier om de gemeente op te halen"
        background={Color.BLUE}
        textColor={Color.WHITE}
      />

      {gemeente ? (
        <Text className="mt-4 text-black  font-comfortaa-regular">
          De dorpsnaam is: {gemeente}
        </Text>
      ) : null}

    <View className="mt-4">
             <Link href="/register" asChild>
                 <PressableButton
                     title="Naar Registratiepagina"
                     background={Color.BLUE}
                     textColor={Color.WHITE}
                 />
             </Link>
           </View>

    </View>
  );
}
