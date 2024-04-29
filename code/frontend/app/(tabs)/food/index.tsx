import { StyleSheet } from "react-native";

import { food_styles } from "@/assets/styles/food";
import { Text, View } from "@/components/Themed";
import { Link, Stack } from "expo-router";
import { useEffect } from "react";
import { localhost } from "@/constants";

/*
const fetchConsumedFoodOfTheDay = async () => {
  const response = await fetch(
    `${localhost}8080/api/food/search?query=${query}`
  );
  const food: Food[] = await response.json();

  return food
};
*/
export default function FoodScreen() {
/*
  useEffect(() => {

  })
*/
  return (
    <View style={food_styles.container}>
       <Stack.Screen options={{ title: "Food" }} />
      <Link style={food_styles.link} href={"/food/search-food"}>
        Add Food +
      </Link>
    </View>
  );
}
