import { Neighborhoods } from "@/types/neighborhood";
import NeighborhoodGlassCard from "../card/NeighborhoodGlassCard";
import { useState } from "react";
import neighborhoodService from "@/services/neighborhoodService";
import { useAuth } from "../auth/context/AuthContext";
import { View, Text } from "react-native";
import { useTranslation } from "react-i18next";
import LabeledInput from "../settings/LabeledInput";
import { Search } from "lucide-react-native";

type Props = {
  neighborhoods: Neighborhoods[];
  onJoined?: (neighboorhoodId: string) => void;
  onLeft?: (neighboorhoodId: string) => void;
  authToken?: string | null;
  isMemberView?: boolean;
};

const ListNeighborhoods = ({
  neighborhoods,
  onJoined,
  onLeft,
  authToken,
  isMemberView = false,
}: Props) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { token } = useAuth();
  const { t } = useTranslation();
  const [joinedSectors, setJoinedSectors] = useState<string[]>([]);
  const [isFocused, setIsFocused] = useState(false);

  const handleJoin = async (neighborhoodId: string) => {
    try {
      await neighborhoodService.addToNeighborhood(
        neighborhoodId,
        token ?? authToken!
      );
      setJoinedSectors((prev) => [...prev, neighborhoodId]);
      if (onJoined) {
        onJoined(neighborhoodId);
      }
    } catch (error) {
      console.error("Error joining neighborhood:", error);
    }
  };

  const handleLeave = async (neighborhoodId: string) => {
    try {
      await neighborhoodService.removeFromNeighborhood(neighborhoodId, token ?? authToken!);
      setJoinedSectors((prev) => prev.filter((id) => id !== neighborhoodId));
      if (onLeft) {
        onLeft(neighborhoodId);
      }
    } catch (error) {
      console.error("Error leaving neighborhood:", error);
    }
  };

  const filteredNeighborhoods = neighborhoods.filter((neighborhood) =>
    neighborhood.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <View className="px-1 mt-2">
        <LabeledInput
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder={t("register.neighborhood.searchplaceholder")}
          isFocused={isFocused}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          leftIcon={<Search size={20} color="#828282" />}
        />
      </View>
      <View className="px-1 mt-6 mb-10">
        {filteredNeighborhoods.map((item) => {
          const isJustJoined = joinedSectors.includes(item.statischeSectorCode);

          let action: "join" | "leave" = isJustJoined ? "leave" : "join";
          if (isMemberView) {
            action = "leave";
          }

          const participantCount =
            (item.residents?.length || 0) +
            (isJustJoined && !isMemberView ? 1 : 0);

          return (
            <NeighborhoodGlassCard
              key={item.statischeSectorCode}
              name={item.name}
              participants={participantCount}
              action={action}
              onJoin={() => handleJoin(item.statischeSectorCode)}
              onLeave={() => handleLeave(item.statischeSectorCode)}
            />
          );
        })}

        {filteredNeighborhoods.length === 0 && searchQuery.length > 0 && (
          <View className="items-center mt-4">
            <Text className="text-[#CB0000]">
              {" "}
              {t("register.neighborhood.notfound")} '{searchQuery}'
            </Text>
          </View>
        )}
      </View>
    </>
  );
};

export default ListNeighborhoods;
