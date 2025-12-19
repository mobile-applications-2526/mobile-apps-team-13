import Header from "@/components/Header";
import { ActivityIndicator, ScrollView, View, Text } from "react-native";
import NeighborhoodGlassCard from "@/components/card/NeighborhoodGlassCard";
import { useEffect, useState } from "react";
import neighborhoodService from "@/services/neighborhoodService";
import { Neighborhoods } from "@/types/neighborhood";
import { useTranslation } from "react-i18next";
import { SearchBar } from "@/components/SearchBar";
import PinnedBottomButton from "@/components/PinnedBottomButton";

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
  const [loading, setLoading] = useState<boolean>(true);
  const [neighborhoods, setNeighborhoods] = useState<Neighborhoods[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [joinedSectors, setJoinedSectors] = useState<string[]>([]);

  useEffect(() => {
    const LoadNeighborhoods = async () => {
      try {
        const response =
          await neighborhoodService.fetchNeighborhoodsByPostalCode(postalCode);
        const data: Neighborhoods[] = await response.json();
        setNeighborhoods(data);
      } catch (error) {
        console.error("Error fetching neighborhoods:", error);
      } finally {
        setLoading(false);
      }
    };
    LoadNeighborhoods();
  }, [postalCode]);

    const filteredNeighborhoods = neighborhoods.filter((neighborhood) => neighborhood.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleJoin = async (neighborhoodId: string) => {
    try {
      await neighborhoodService.addToNeighborhood(neighborhoodId, token!);
      setJoinedSectors((prev) => [...prev, neighborhoodId]);
    } catch (error) {
      console.error("Error joining neighborhood:", error);
    }
  }

  const handleLeave = async (neighborhoodId: string) => {
    try {
      await neighborhoodService.removeFromNeighborhood(neighborhoodId, token!);
      setJoinedSectors((prev) => prev.filter(id => id !== neighborhoodId));
    } catch (error) {
      console.error("Error leaving neighborhood:", error);
    }
  };



  return ( <>
    <ScrollView>
      <Header title={t("register.neighborhood.title")} subtitle={t("register.neighborhood.subtitle")} onBack={onBack} />
      <SearchBar onSearch={(text) => setSearchQuery(text)} />
      <View className="px-1 mt-6 mb-10">
        {loading ? (
          <ActivityIndicator size="large" color="#100D08" />
        ) : (
          filteredNeighborhoods.map((item) => {
            return (
              <NeighborhoodGlassCard
                key={item.statischeSectorCode}
                name={item.name}
                participants={item.residents.length + (joinedSectors.includes(item.statischeSectorCode) ? 1 : 0)}
                action={joinedSectors.includes(item.statischeSectorCode) ? "leave" : "join"}
                onJoin={() => handleJoin(item.statischeSectorCode)}
                onLeave={() => handleLeave(item.statischeSectorCode)}
              />
            );
          })
        )}

        {!loading && filteredNeighborhoods.length === 0 && searchQuery.length > 0 && (
          <View className="items-center mt-4">
                <Text className="text-gray-500"> {t("register.neighborhood.notfound")} '{searchQuery}'</Text>
            </View>
        )}
      </View>
    </ScrollView>
    {joinedSectors.length > 0 && (
    <View>
       <PinnedBottomButton count={joinedSectors.length} onNext={onNext} />
    </View>
    )}
    </>
  );
}
