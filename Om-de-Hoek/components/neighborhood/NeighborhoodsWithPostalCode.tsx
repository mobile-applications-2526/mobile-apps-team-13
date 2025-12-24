import neighborhoodService from "@/services/neighborhoodService";
import { Neighborhoods } from "@/types/neighborhood";
import { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import ListNeighborhoods from "./ListNeighborhoods";

type Props = {
    postalCode: string;
    token?: string;
    retrieveCounter?: (count: number) => void;
};

const NeighborhoodsWithPostalCode = ({ postalCode, token, retrieveCounter }: Props) => {
    const [neighborhoods, setNeighborhoods] = useState<Neighborhoods[]>([]);
    const [counter, setCounter] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()  => {
        const fetchNeighborhoodsByPostalCode = async () => {
        try {
            const response = await neighborhoodService.fetchNeighborhoodsByPostalCode(postalCode)
            const data: Neighborhoods[] = await response.json();
            setNeighborhoods(data);
        } catch (error) {
            console.error("Error fetching neighborhoods:", error);
        } finally {
            setIsLoading(false);
        }};
        fetchNeighborhoodsByPostalCode();
    }, [postalCode]);

    const updateCounter = (count: number) => {
        if (retrieveCounter) {
            retrieveCounter(count);
        }
        setCounter(count);
    };

    return (
        <>
            {isLoading ? (
                <ActivityIndicator size="large" color="#100D08" />
            ) : (
                <ListNeighborhoods
                    neighborhoods={neighborhoods}
                    onJoined={() => updateCounter(counter + 1)}
                    onLeft={() => updateCounter(counter - 1)}
                    authToken={token}
                />
            )}
        </>
    );
};

export default NeighborhoodsWithPostalCode;