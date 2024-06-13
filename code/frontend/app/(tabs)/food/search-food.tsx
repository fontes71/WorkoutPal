import { View } from "@/components/Themed";
import { Stack } from "expo-router";
import { SearchBar } from "@rneui/themed";
import { useState } from "react";
import { searchFoodByName } from "@/services/food";
import FoodResults from "@/assets/components/food/search/foodResults/FoodResults";
import BarcodeScanner from "@/assets/components/food/search/barcodeScanner/BarcodeScanner";
import FoodSearchBar from "@/assets/components/food/search/foodSearchBar/FoodSearchBar";

export default function AddFoodScreen() {
  const [foodResults, setFood] = useState<Food[]>([]);

  return (
    <View>
      <Stack.Screen options={{ title: "Search food" }} />
      <BarcodeScanner />
      <FoodSearchBar setFood={setFood} />
      <FoodResults results={foodResults} />
    </View>
  );
}
