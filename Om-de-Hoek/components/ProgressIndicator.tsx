import {View} from 'react-native';


export const ProgressIndicator = ({ totalSteps, currentStep }: {totalSteps: number, currentStep: number}) => {
     return (
        <View className="flex-row justify-center items-center my-4">
            {Array.from({ length: totalSteps }).map((_, index) => (
                <View
                    key={index}
                    className={`w-3 h-3 rounded-full mx-1 ${
                        index <= currentStep ? 'bg-blue-500' : 'bg-gray-500'
                    }`}
                />
            ))}
        </View>
     );
};