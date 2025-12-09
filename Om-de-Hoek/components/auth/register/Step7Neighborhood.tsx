import Header from "@/components/Header";
import { ActivityIndicator, ScrollView, View } from "react-native";
import AuthHeader from "../AuthHeader";
import NeighborhoodGlassCard from "@/components/card/NeighborhoodGlassCard";
import gemeenteService from "@/services/gemeenteService";
import { Gemeente } from "@/types/gemeente";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import UserService from "@/services/UserService";
import neighborhoodService from "@/services/neighborhoodService";
import { Neighborhoods } from "@/types/neighborhood";

type Props = {
  postalCode: string;
  onNext?: () => void;
  onBack?: () => void;
};

export default function Step7Neighborhood({
  postalCode,
  onNext,
  onBack,
}: Props) {
  const [loading, setLoading] = useState<boolean>(true);
  const [neighborhoods, setNeighborhoods] = useState<Array<string>>([]);

  useEffect(() => {
    const LoadNeighborhoods = async () => {
      try {
        const response =
          await neighborhoodService.fetchNeighborhoodsByPostalCode(postalCode);
        const data: Neighborhoods[] = await response.json();
        console.log(data);
        setNeighborhoods(data.map((neighborhood) => neighborhood.naam));
      } catch (error) {
        console.error("Error fetching neighborhoods:", error);
      } finally {
        setLoading(false);
      }
    };
    LoadNeighborhoods();
  }, [postalCode]);

  return (
    <ScrollView>
      <Header title="Buurten in" subtitle="de buurt" onBack={onBack} />
      <View className="py-4">
        {loading ? (
          <ActivityIndicator size="large" color="#100D08" />
        ) : (
          neighborhoods.map((item, index) => (
            <NeighborhoodGlassCard key={index} name={item} action="join" />
          ))
        )}
      </View>
    </ScrollView>
  );
}
