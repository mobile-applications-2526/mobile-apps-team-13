import { ActivityIndicator, View, ScrollView } from "react-native";
import SettingsTitles from "@/components/settings/SettingsTitles";
import Back from "@/components/Back";
import { ArrowLeft, Plus } from "lucide-react-native";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import userService from "@/services/userService";
import { useAuth } from "@/components/auth/context/AuthContext";
import neighborhoodService from "@/services/neighborhoodService";
import { Neighborhoods } from "@/types/neighborhood";
import { useTranslation } from "react-i18next";
import FloatingActionButton from "@/components/FloatingActionButton";
import SettingsHeader from "@/components/settings/SettingsHeader";

const PROFILE_PATH = "/(tabs)/profile";

export default function MyNeighborhoodsPage() {
  const [neighborhoods, setNeighborhoods] = useState<Neighborhoods[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const router = useRouter();
  const { token } = useAuth();
  const { t } = useTranslation();

  useEffect(() => {
    if (!token) return;

    const fetchNeighborhoodsFromUser = async () => {
      try {
        const data = await userService.loggedInuser(token);

        const neighborhoodsWithDetails = await Promise.all(
          data.neighborhoods.map(async (n: Neighborhoods) => {
            try {
              const detailData =
                await neighborhoodService.fetchNeighborhoodsByStatisticalSectorCode(
                  n.statischeSectorCode
                );
              return { ...n, residents: detailData.residents || [] };
            } catch (e) {
              return n;
            }
          })
        );

        setNeighborhoods(neighborhoodsWithDetails);
      } catch (error) {
        console.error("Failed to fetch neighborhoods", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNeighborhoodsFromUser();
  }, [token]);

  const onNeighborLeft = (neighborhoodId: string) => {
    setNeighborhoods((prev) =>
      prev.filter((n) => n.statischeSectorCode !== neighborhoodId)
    );
  };

  return (
    <>
      <View className="flex-1 bg-white relative">
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          <View className="px-6">
              <SettingsHeader
                title={t("settings.neighborhoods.title")}
                subtitle={t("settings.neighborhoods.subtitle")}
              />
            {isLoading ? (
              <ActivityIndicator size="large" color="#100D08" />
            ) : (
              <ListNeighborhoods
                neighborhoods={neighborhoods}
                onLeft={onNeighborLeft}
                authToken={token}
                isMemberView={true}
              />
            )}
          </View>
        </ScrollView>
        <FloatingActionButton
          icon={<Plus color="white" size={28} strokeWidth={2.5} />}
          onPress={() => router.push("/(settings)/joinNeighborhood")}
          isLoading={isLoading}
        />
      </View>
    </>
  );
}
