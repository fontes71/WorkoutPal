import { StyleSheet } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { Link, Stack } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import FoodCover from "@/app/utils/components/FoodCover";
import { Food } from "@/domain/types";

const foodItem = {
  id: "3017620422003",
  name: "Nutella",
  brand: "ferrero",
  quantity: "400 g",
  quantity_grams: 400,
  quantity_unit: "g",
  imageUrl:
    "https://images.openfoodfacts.org/images/products/301/762/042/2003/front_en.633.400.jpg",
  calories: 539,
  protein: 6.3,
  fat: 30.9,
  carbs: 57.5,
};

export default function FoodDetailsScreen() {
  const { foodJSON } = useLocalSearchParams<{ foodJSON: string }>();
  const food = JSON.parse(foodJSON) as Food;

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Add Food" }} />
      <Text style={styles.title}> {food.name}</Text>
      <View style={styles.overview}>
        <FoodCover imageUrl={food.imageUrl} />
        <Text> {food.calories} cal </Text>
        <Text> {food.carbs} g </Text>
        <Text> {food.fat} g </Text>
        <Text> {food.protein} g </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    paddingTop: 30,
    paddingBottom: 30,
    textAlign: "center",
  },
  overview: {

    flex: 1,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
});
