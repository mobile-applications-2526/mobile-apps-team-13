import { Neighborhoods } from "@/types/neighborhood";
import NeighborhoodGlassCard from "../card/NeighborhoodGlassCard";
import { useState } from "react";
import neighborhoodService from "@/services/neighborhoodService";
import { useAuth } from "../auth/context/AuthContext";
import { SearchBar } from "../SearchBar";
import { View, Text } from "react-native";
import { useTranslation } from "react-i18next";

type Props = {
    neighborhoods: Neighborhoods[];
    onJoined?: (neighboorhoodId: string) => void;
    onLeft?: (neighboorhoodId: string) => void;
    authToken?: string;

};

const ListNeighborhoods = ({neighborhoods, onJoined, onLeft, authToken}: Props) => {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const { token } = useAuth();
    const { t } = useTranslation();
    const [joinedSectors, setJoinedSectors] = useState<string[]>([]);
    
  const handleJoin = async (neighborhoodId: string) => {
    try {
      await neighborhoodService.addToNeighborhood(neighborhoodId, token ?? authToken!);
      setJoinedSectors((prev) => [...prev, neighborhoodId]);
        if (onJoined) {
            onJoined(neighborhoodId);
        }
    } catch (error) {
      console.error("Error joining neighborhood:", error);
    }
  }

  const handleLeave = async (neighborhoodId: string) => {
    try {
      await neighborhoodService.removeFromNeighborhood(neighborhoodId, token!);
      setJoinedSectors((prev) => prev.filter(id => id !== neighborhoodId));
        if (onLeft) {
            onLeft(neighborhoodId);
        }
    } catch (error) {
      console.error("Error leaving neighborhood:", error);
    }
  };

  const filteredNeighborhoods = neighborhoods.filter((neighborhood) => neighborhood.name.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return ( <>
        <SearchBar onSearch={(text) => setSearchQuery(text)} />
        <View className="px-1 mt-6 mb-10">
        {filteredNeighborhoods.map((item) => {
            return (
            <NeighborhoodGlassCard
                key={item.statischeSectorCode}
                name={item.name}
                participants={item.residents.length + (joinedSectors.includes(item.statischeSectorCode) ? 1 : 0)}
                action={joinedSectors.includes(item.statischeSectorCode) ? "leave" : "join"}
                onJoin={() => handleJoin(item.statischeSectorCode)}
                onLeave={() => handleLeave(item.statischeSectorCode)}
            />
        )})}

        {filteredNeighborhoods.length === 0 && searchQuery.length > 0 && (
          <View className="items-center mt-4">
                <Text className="text-gray-500"> {t("register.neighborhood.notfound")} '{searchQuery}'</Text>
            </View>
        )}
        </View>
        </>
        
    )
};

export default ListNeighborhoods;