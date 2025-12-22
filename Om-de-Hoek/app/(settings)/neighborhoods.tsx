import {ActivityIndicator, View, ScrollView, TouchableOpacity } from "react-native";
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


const PROFILE_PATH = "/(tabs)/profile";


export default function MyNeighborhoodsPage() {
    const [neighborhoods, setNeighborhoods] = useState<Neighborhoods[]>([]);
    const [memberCounts, setMemberCounts] = useState<Record<string, number>>({});
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const router = useRouter();
    const { token } = useAuth();

    useEffect(() => {
        if (!token) return;
        
        const fetchNeighborhoodsFromUser = async () => {
           try{
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
                        const response = await neighborhoodService.fetchNeighborhoodsByStatisticalSectorCode(n.statischeSectorCode);
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
          const response = await neighborhoodService.removeFromNeighborhood(neighborhoodId, token!);
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
    

    return ( <>
        <View className="flex-1 bg-white relative">
            <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 100 }}>
                <View className="px-6">
                    <View className="flex-row items-center mt-2 mb-4">
                    <Back icon={<ArrowLeft color="#100D08" size={20}/>} onBack={() => router.push(PROFILE_PATH)}/>
                    <SettingsHeader
                        title="Mijn"
                        subtitle="Buurten"
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
            <TouchableOpacity
                onPress={() => router.push("/")}
                activeOpacity={0.8}
                className="absolute bottom-8 right-6 h-14 w-14 items-center justify-center rounded-full bg-[#2548BC] shadow-lg shadow-black/30"
                style={{ elevation: 6 }}
            >
                <Plus color="white" size={28} strokeWidth={2.5} />
            </TouchableOpacity>
        </View>
    </>
    )
}