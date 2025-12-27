import { ActivityIndicator, View, ScrollView } from "react-native";
import SettingsHeader from "@/components/settings/SettingsHeader";
import Back from "@/components/Back";
import { ArrowLeft, Plus } from "lucide-react-native";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import userService from "@/services/userService";
import { useAuth } from "@/components/auth/context/AuthContext";
import NeighborhoodGlassCard from "@/components/card/NeighborhoodGlassCard";
import neighborhoodService from "@/services/neighborhoodService";
import { Neighborhoods } from "@/types/neighborhood";
import { useTranslation } from "react-i18next";
import FloatingActionButton from "@/components/FloatingActionButton";

const PROFILE_PATH = "/(tabs)/profile";

export default function MyNeighborhoodsPage() {
  const [neighborhoods, setNeighborhoods] = useState<Neighborhoods[]>([]);
  const [memberCounts, setMemberCounts] = useState<Record<string, number>>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const router = useRouter();
  const { token } = useAuth();
  const { t } = useTranslation();

  useEffect(() => {
    if (!token) return;

    const fetchNeighborhoodsFromUser = async () => {
      try {
        const response = await userService.loggedInuser(token);
        const data = await response.json();
        setNeighborhoods(data.neighborhoods);
      } catch (error) {
        console.error("Failed to fetch neighborhoods", error);
      }
    };

    fetchNeighborhoodsFromUser();
  }, [token]);

  useEffect(() => {
    if (neighborhoods.length === 0) return;

    const LoadMembers = async () => {
      const counts: Record<string, number> = {};
      try {
        await Promise.all(
          neighborhoods.map(async (n) => {
            const response =
              await neighborhoodService.fetchNeighborhoodsByStatisticalSectorCode(
                n.statischeSectorCode
              );
            const data = await response.json();
            counts[n.statischeSectorCode] = data.residents?.length || 0;
          })
        );
        setMemberCounts(counts);
      } catch (error) {
        console.error("Error fetching members:", error);
      } finally {
        setIsLoading(false);
      }
    };
    LoadMembers();
  }, [neighborhoods]);

  const handleLeave = async (neighborhoodId: string) => {
    try {
      const response = await neighborhoodService.removeFromNeighborhood(
        neighborhoodId,
        token!
      );
      if (response.ok) {
        setNeighborhoods((prev) =>
          prev.filter((n) => n.statischeSectorCode !== neighborhoodId)
        );

        setMemberCounts((prev) => {
          const updatedCounts = { ...prev };
          delete updatedCounts[neighborhoodId];
          return updatedCounts;
        });
      }
    } catch (error) {
      console.error("Error leaving neighborhood:", error);
    }
  };

  return (
    <>
      <View className="flex-1 bg-white relative">
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          <View className="px-6">
            <View className="flex-row items-center mt-2 mb-4">
              <Back
                icon={<ArrowLeft color="#100D08" size={20} />}
                onBack={() => router.push(PROFILE_PATH)}
              />
              <SettingsHeader
                title={t("settings.neighborhoods.title")}
                subtitle={t("settings.neighborhoods.subtitle")}
              />
            </View>
            {isLoading ? (
              <ActivityIndicator size="large" color="#100D08" />
            ) : (
              neighborhoods.map((item) => {
                return (
                  <NeighborhoodGlassCard
                    key={item.statischeSectorCode}
                    name={item.name}
                    participants={memberCounts[item.statischeSectorCode] || 0}
                    action="leave"
                    onLeave={() => handleLeave(item.statischeSectorCode)}
                  />
                );
              })
            )}
          </View>
        </ScrollView>
        <FloatingActionButton
          icon={<Plus color="white" size={28} strokeWidth={2.5} />}
          onPress={() => router.push("/")}
          isLoading={isLoading}
        />
      </View>
    </>
  );
}
