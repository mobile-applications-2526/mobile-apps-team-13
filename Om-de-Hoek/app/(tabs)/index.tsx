import { Pressable, ScrollView, Text, View } from "react-native";
import { useState } from "react";
import {PressableButton} from "@/components/PressableButton";
import {Color} from "@/types/StyleOptions";
import gemeenteService from "@/services/gemeenteService";
import Header from "@/components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import NotificationCard from "@/components/card/NotificationCard";
import { TriangleAlert, Siren } from "lucide-react-native";
import { useRouter } from "expo-router";

const router = useRouter();

export default function TabTwoScreen() {

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="items-center">
        <Header title="Boseind 3910 Neerpelt," subtitle="Pelt"/>
      </View>
      <ScrollView className="mt-10 px-6">
        <Text className="text-gray font-comfortaa-regular">Laatste meldingen</Text>
        <NotificationCard 
            icon={<TriangleAlert color="#100D08" size={24} strokeWidth={2} />} 
            title="Waarschuwing" 
            subtitle="Marter gespot: Handboogstraat 6u37" 
            time="16u47" 
        />
        <NotificationCard 
            icon={<Siren color="#100D08" size={24} strokeWidth={2} />} 
            title="Noodgeval" 
            subtitle="Mogelijke gaslek: Boomstraat 49" 
            time="11u23" 
        />
      </ScrollView>
      <Pressable onPress={() => router.push('/createNotification')}>
        <View className="absolute bottom-10 right-6">
           <Text>Knop</Text>
        </View>
      </Pressable>
    </SafeAreaView>
  );
}
