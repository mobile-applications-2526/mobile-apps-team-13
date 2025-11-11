import { StyleSheet, Button } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';

import { useState } from 'react';

import { fetchGemeenteByPostcode } from '@/services/gemeenteService';

export default function TabTwoScreen() {
    const [gemeente, setGemeente] = useState<string>("");
    const [postcode, setPostcode] = useState<string>("3000");

    const handleFetchGemeente = async () => {
        const result = await fetchGemeenteByPostcode(postcode, "Nl");
        if (result) {
            setGemeente(result.naam);
        } else {
            setGemeente("Gemeente niet gevonden");
        }
    }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab Two</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="app/(tabs)/two.tsx" />
        <Button onPress={async () => await handleFetchGemeente()} title="Krijg de dorpsnaam" />
        {gemeente ? <Text>De dorpsnaam is: {gemeente}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
