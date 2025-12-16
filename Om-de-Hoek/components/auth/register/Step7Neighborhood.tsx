import Header from "@/components/Header";
import { ActivityIndicator, ScrollView, View, Text } from "react-native";
import NeighborhoodGlassCard from "@/components/card/NeighborhoodGlassCard";
import { useEffect, useState } from "react";
import neighborhoodService from "@/services/neighborhoodService";
import { Neighborhoods } from "@/types/neighborhood";
import { useTranslation } from "react-i18next";
import { SearchBar } from "@/components/SearchBar";

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

    const { t } = useTranslation();
  const [loading, setLoading] = useState<boolean>(true);
  const [neighborhoods, setNeighborhoods] = useState<Array<string>>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const LoadNeighborhoods = async () => {
      try {
        const response =
          await neighborhoodService.fetchNeighborhoodsByPostalCode(postalCode);
        const data: Neighborhoods[] = await response.json();
        setNeighborhoods(data.map((neighborhood) => neighborhood.name));
      } catch (error) {
        console.error("Error fetching neighborhoods:", error);
      } finally {
        setLoading(false);
      }
    };
    LoadNeighborhoods();
  }, [postalCode]);

  const filteredNeighborhoods = neighborhoods.filter((neighborhood) => neighborhood.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <ScrollView>
      <Header title={t("register.neighborhood.title")} subtitle={t("register.neighborhood.subtitle")} onBack={onBack} />
      <SearchBar onSearch={(text) => setSearchQuery(text)} />
      <View className="px-1 mt-6 mb-10">
        {loading ? (
          <ActivityIndicator size="large" color="#100D08" />
        ) : (
          filteredNeighborhoods.map((item, index) => (
            <NeighborhoodGlassCard key={index} name={item} action="join" />
          ))
        )}

        {!loading && filteredNeighborhoods.length === 0 && searchQuery.length > 0 && (
          <View className="items-center mt-4">
                <Text className="text-gray-500"> {t("register.neighborhood.notfound")} '{searchQuery}'</Text>
            </View>
        )}
      </View>
    </ScrollView>
  );
}
