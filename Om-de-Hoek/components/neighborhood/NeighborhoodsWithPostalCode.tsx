import neighborhoodService from "@/services/neighborhoodService";
import { Neighborhoods } from "@/types/neighborhood";
import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, View } from "react-native";
import ListNeighborhoods from "./ListNeighborhoods";
import PinnedBottomButton from "../PinnedBottomButton";

type Props = {
  postalCode: string;
  token?: string | null;
  onNext?: () => void;
};

const NeighborhoodsWithPostalCode = ({ postalCode, token, onNext }: Props) => {
  const [neighborhoods, setNeighborhoods] = useState<Neighborhoods[]>([]);
  const [counter, setCounter] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNeighborhoodsByPostalCode = async () => {
      try {
        const data =
          await neighborhoodService.fetchNeighborhoodsByPostalCode(postalCode);
        setNeighborhoods(data);
      } catch (error) {
        console.error("Error fetching neighborhoods:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchNeighborhoodsByPostalCode();
  }, [postalCode]);

  const updateCounter = (count: number) => {
    setCounter(count);
  };

  return (
    <View className="flex-1 relative">
      {isLoading ? (
        <ActivityIndicator size="large" color="#100D08" className="mt-10" />
      ) : (
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        >
          <ListNeighborhoods
            neighborhoods={neighborhoods}
            onJoined={() => updateCounter(counter + 1)}
            onLeft={() => updateCounter(counter - 1)}
            authToken={token}
          />
        </ScrollView>
      )}
      {counter > 0 && <PinnedBottomButton count={counter} onNext={onNext} />}
    </View>
  );
};

export default NeighborhoodsWithPostalCode;
