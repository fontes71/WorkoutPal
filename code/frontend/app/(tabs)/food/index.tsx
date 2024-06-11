import { FlatList, Pressable, StyleSheet } from "react-native";

import { food_styles } from "@/assets/styles/food";
import { Text, View } from "@/components/Themed";
import { Link, Stack, router } from "expo-router";
import { useContext, useEffect, useState } from "react";
import getDate from "@/assets/functions/getDate";
import { Food } from "@/domain/types";
import foodItemRoute from "@/assets/functions/foodItemRoute";
import { consumedFoodOfTheDay } from "@/services/food";
import { UserContext } from "@/assets/components/auth/AuthContext";

const getNutrients = (food: Food[] | null) => {
  if (!food) return { calories: 0, protein: 0, carbs: 0, fat: 0 };

  return food?.reduce(
    (acc, it) => {
      acc.calories += it.calories;
      acc.protein += it.protein ? parseInt(it.protein) : 0;
      acc.carbs += it.carbs ? parseInt(it.carbs) : 0;
      acc.fat += it.fat ? parseInt(it.fat) : 0;
      return acc;
    },
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );
};

type ConsumedFoodProps = {
  food: Food[] | null;
  handleFoodPress: (item: Food) => void;
};

const ConsumedFood: React.FC<ConsumedFoodProps> = ({
  food,
  handleFoodPress,
}) => (
  <>
    {food && (
      <View>
        {food.map((item, index) => (
          <View key={index}>
            <Text>{item.name}</Text>
          </View>
        ))}
      </View>
    )}
  </>
);

export default function FoodScreen() {
  const [food, setFood] = useState<Food[] | null>(null);
  const { userContext } = useContext(UserContext);

  const { calories, protein, carbs, fat } = getNutrients(food);

  useEffect(() => {
    const fetchConsumedFoodOfTheDay = async () => {
      const date = getDate();
      console.log(date);

      const food: Food[] | null = await consumedFoodOfTheDay(
        userContext?.token,
        date
      );

      setFood(food);
    };
    fetchConsumedFoodOfTheDay();
  }, []);

  const handleFoodPress = async (food: Food) => {
    router.push(foodItemRoute(food));
  };

  return (
    <View style={food_styles.container}>
      <View style={food_styles.nutrients}>
        <Text>Calories:{calories}</Text>
        <Text>Protein:{protein}</Text>
        <Text>Carbs;{carbs}</Text>
        <Text>Fat:{fat}</Text>
      </View>
      <Stack.Screen options={{ title: "Food" }} />
      <ConsumedFood food={food} handleFoodPress={handleFoodPress} />
      <Link style={food_styles.link} href={"/food/search-food"}>
        Add Food +
      </Link>
    </View>
  );
}
