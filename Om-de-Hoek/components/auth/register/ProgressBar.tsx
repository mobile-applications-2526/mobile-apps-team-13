import { View } from "react-native";

type Props = {
  currentStep: number;
  totalSteps: number;
};

export default function ProgressBar({ currentStep, totalSteps }: Props) {
  const getStepClasses = (index: number) => {
    if (index < currentStep) return "w-6 h-2.5 bg-blue shadow-md rounded-full";
    if (index === currentStep)
      return "w-4 h-2.5 bg-blue shadow-sm rounded-full";
    return "w-2 h-2 bg-gray shadow-none rounded-full";
  };

  return (
    <View className="flex-row items-center justify-center gap-2 py-8 px-4">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <View
          key={index}
          className={`transition-all ${getStepClasses(index)}`}
        />
      ))}
    </View>
  );
}
