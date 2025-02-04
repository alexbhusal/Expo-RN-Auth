import { ActivityIndicator, View } from "react-native";

export default function startPage() {
  return (
    <View className="flex-1 justify-center">
      <ActivityIndicator size="large" color="green" />
    </View>
  );
}
