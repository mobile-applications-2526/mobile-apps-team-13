import {View} from "react-native";

type Props = {
    currentStep: number;
    totalSteps: number;
}


export default function ProgressBar({ currentStep, totalSteps }: Props) {
    const createBubbles = () => {
        let bubbles = [];
        for (let i = 1; i <= totalSteps; i++) {
            bubbles.push(
                <View
                    key={i}
                    className={`w-4 h-4 rounded-full mx-1 ${
                        i <= currentStep + 1 ? 'bg-blue' : 'bg-gray'
                    }`}
                ></View>
            );
        }

        return bubbles;
    };
    return (
        <View className={"flex-row justify-center mb-12 mt-4 space-between"}>
            {createBubbles()}
        </View>
    )
}