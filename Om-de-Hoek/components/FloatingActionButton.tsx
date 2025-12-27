import { ActivityIndicator, TouchableOpacity } from "react-native";

type Props = {
  icon?: React.ReactNode;
  onPress?: () => void;
  isLoading?: boolean;
};
const FloatingActionButton: React.FC<Props> = ({
  icon,
  onPress,
  isLoading,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isLoading}
      activeOpacity={0.8}
      className={`absolute bottom-8 right-6 h-14 w-14 items-center justify-center rounded-full bg-[#2548BC] shadow-lg shadow-black/30 ${isLoading ? "opacity-80" : ""}`}
      style={{ elevation: 6, zIndex: 50 }}
    >
      {isLoading ? <ActivityIndicator color="white" /> : icon}
    </TouchableOpacity>
  );
};
export default FloatingActionButton;
