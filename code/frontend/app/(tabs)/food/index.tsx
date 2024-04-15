import { StyleSheet } from "react-native";

import { food_styles } from "@/assets/styles/food";
import { Text, View } from "@/components/Themed";
import { Link, Stack } from "expo-router";

export default function FoodScreen() {
  return (
    <View style={food_styles.container}>
       <Stack.Screen options={{ title: "Food" }} />
      <Link style={food_styles.link} href={"/food/search-food"}>
        Add Food +
      </Link>
    </View>
  );
}
