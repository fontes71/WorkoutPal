import { View } from "react-native";
import { Stack } from "expo-router";
import BarcodeScanner from "@/assets/components/food/search/barcodeScanner/BarcodeScanner";
import SearchByName from "@/assets/components/food/search/searchByName/SearchByName";

const SearchFood = () => {

  return (
    <View>
      <Stack.Screen options={{ title: "Search food" }} />
      <BarcodeScanner />
      <SearchByName />
    </View>
  );
}

export default SearchFood
