import { View } from "@/components/Themed";
import { Stack } from "expo-router";
import { SearchBar } from "@rneui/themed";
import { useState } from "react";
import { Food } from "@/domain/types";
import { searchFoodByName } from "@/services/food";
import FoodResults from "@/assets/components/food/search/foodResults/FoodResults";
import BarcodeScanner from "@/assets/components/food/search/barcodeScanner/BarcodeScanner";

export default function AddFoodScreen() {
  const [query, setQuery] = useState("");
  const [foodResults, setFood] = useState<Food[]>([]);

  const handleSearchSubmit = () => {
    const fetchFoodResults = async () => {
      const food: Food[] = await searchFoodByName(query);

      setFood(food);
    };

    if (query.length > 1) fetchFoodResults();
  };

  const updateQuery = (value: string) => {
    setQuery(value);
  };


  return (
    <View>
      <Stack.Screen options={{ title: "Search food" }} />
      <BarcodeScanner />
      <SearchBar
        placeholder="Type Here..."
        onSubmitEditing={handleSearchSubmit}
        returnKeyType="search"
        onChangeText={updateQuery}
        value={query}
      />
      <FoodResults results={foodResults} />
    </View>
  );
}
