import { View } from "@/components/Themed";
import { Stack } from "expo-router";
import { useState } from "react";
import FoodResults from "@/assets/components/food/search/foodResults/FoodResults";
import BarcodeScanner from "@/assets/components/food/search/barcodeScanner/BarcodeScanner";
import FoodSearchBar from "@/assets/components/food/search/foodSearchBar/FoodSearchBar";
import { searchFoodByName } from "@/services/food";
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
