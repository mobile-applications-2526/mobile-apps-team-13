import { View } from "react-native";

type Props = {
  currentStep: number;
  totalSteps: number;
};

export default function ProgressBar({ currentStep, totalSteps }: Props) {
  return (
    <View className="flex-row items-center justify-center gap-3 py-6 px-4">
      {Array.from({ length: totalSteps }).map((_, index) => {
        const isCompleted = index < currentStep;
        const isCurrent = index === currentStep;

        let sizeClasses = "w-3 h-3";
        let bgClasses = "bg-gray opacity-40";

        if (isCompleted) {
          sizeClasses = "w-5 h-3";
          bgClasses = "bg-blue";
        } else if (isCurrent) {
          sizeClasses = "w-4 h-3";
          bgClasses = "bg-blue opacity-75";
        }

        return (
          <View
            key={index}
            className={`rounded-full transition-all ${sizeClasses} ${bgClasses}`}
          />
        );
      })}
    </View>
  );
}
