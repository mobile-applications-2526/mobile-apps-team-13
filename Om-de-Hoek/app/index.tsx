import {Button, Text, View} from "react-native";
import {useState} from "react";
import {fetchGemeenteByPostcode} from "@/service/GemeenteService";

export default function Index() {
    const [townName, setTownName] = useState<string>("")
    const [postcode, setPostcode] = useState<string>("3000")

    const fetchTownName = async () => {
        try {
            const gemeente = await fetchGemeenteByPostcode(postcode)
            setTownName(gemeente.naam)
        } catch (error) {
            console.error("Error fetching town name:", error)
        }
    }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
        <Button onPress={async () => await fetchTownName()} title="Krijg de dorpsnaam" />
        {townName ? <Text>De dorpsnaam is: {townName}</Text> : null}
    </View>
  );
}
