import {ActivityIndicator, ScrollView, View} from "react-native";
import SettingsHeader from "@/components/settings/SettingsHeader";
import {useAuth} from "@/components/auth/context/AuthContext";
import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";
import {Neighborhood} from "@/types/neighborhood";
import neighborhoodService from "@/services/neighborhoodService";
import ListNeighborhoods from "@/components/neighborhood/ListNeighborhoods";

export default function JoinNeighborhoodsPage() {
  const [neighborhoods, setNeighborhoods] = useState<Neighborhood[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { token } = useAuth();
  const { t } = useTranslation();

  useEffect(() => {
    const fetchRecomendedNeighborhoods = async () => {
      try {
        const data = await neighborhoodService.fetchRecommendedNeighborhoods(
          token!
        );
        setNeighborhoods(data);
      } catch (error) {
        console.error("Failed to fetch recommended neighborhoods", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecomendedNeighborhoods();
  }, [token]);

  return (
    <>
      <View
        style={{ flex: 1, paddingHorizontal: 24, justifyContent: "center" }}
      >
        <View className="flex-1 bg-white relative">
          <SettingsHeader
            title={t("settings.neighborhoods.join.title")}
            subtitle={t("settings.neighborhoods.join.subtitle")}
          />
          {isLoading ? (
            <ActivityIndicator size="large" color="#2548BC" animating={true} />
          ) : (
            <ScrollView
              contentContainerStyle={{ paddingBottom: 20 }}
              showsVerticalScrollIndicator={false}
            >
              <ListNeighborhoods neighborhoods={neighborhoods} />
            </ScrollView>
          )}
        </View>
      </View>
    </>
  );
}
