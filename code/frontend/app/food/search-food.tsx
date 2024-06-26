import { View } from "react-native";
import { Stack } from "expo-router";
import BarcodeScanner from "@/assets/components/food/search/barcodeScanner/BarcodeScanner";
import SearchByName from "@/assets/components/food/searchByName/SearchByName";

export default function AddFoodScreen() {

  return (
    <View>
      <Stack.Screen options={{ title: "Search food" }} />
      <BarcodeScanner />
      <SearchByName />
    </View>
  );
}
