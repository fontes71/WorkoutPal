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

  useEffect(() => {
    const fetchConsumedFoodOfTheDay = async () => {
      const date = getDate();

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
      <Stack.Screen options={{ title: "Food" }} />
      <ConsumedFood food={food} handleFoodPress={handleFoodPress} />
      <Link style={food_styles.link} href={"/food/search-food"}>
        Add Food +
      </Link>
    </View>
  );
}
