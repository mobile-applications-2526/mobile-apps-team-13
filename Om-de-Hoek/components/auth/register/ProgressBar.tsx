import { View } from "react-native";

type Props = {
  currentStep: number;
  totalSteps: number;
};

export default function ProgressBar({ currentStep, totalSteps }: Props) {
  return (
    <View className="px-6 mb-8 mt-4">
      <View className="flex-row gap-2">
        {Array.from({ length: totalSteps }).map((_, index) => {
          const isCompleted = index < currentStep;

          return (
            <View
              key={index}
              className={`flex-1 w-6 h-2 rounded-full ${isCompleted ? "bg-blue" : "bg-gray"}`}
            />
          );
        })}
      </View>
    </View>
  );
}
