import { View } from "react-native";
import { Stack } from "expo-router";
import BarcodeScanner from "@/assets/components/food/search/barcodeScanner/BarcodeScanner";
import { useState } from "react";
import FoodSearchBar from "../foodSearchBar/FoodSearchBar";
import FoodResults from "../foodResults/FoodResults";

const SearchFood = () => {
  const [name, setName] = useState("");
  
  return (
    <View>
      <Stack.Screen options={{ title: "Search food" }} />
      <FoodSearchBar searchSubmit={setName} />
      <BarcodeScanner />
      {name && <FoodResults name={name}/>}
    </View>
  );
}

export default SearchFood
