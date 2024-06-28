import { food_details_screen } from "@/assets/styles/food";
import { Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useContext, useState } from "react";
import { UserContext } from "@/assets/components/auth/AuthContext";
import { Image, Pressable } from "react-native";
import { router } from "expo-router";
import { consumeFood } from "@/services/food";
import Overview from "@/assets/components/food/details/overview/Overview";

export type QuantityConsumed = {
  value: number,
  unit: string
}

const getFood = () => {
  const { foodJSON } = useLocalSearchParams<{ foodJSON: string }>();
  if (!foodJSON)
     return null
  return JSON.parse(foodJSON) as Food;
  
}

export default function FoodDetailsScreen() {
  const { userContext } = useContext(UserContext);
  const food = getFood()
  if (!food)
    return<Text>Error</Text>;

  
  const [quantityConsumed, setQuantityConsumed] = useState<QuantityConsumed>({
    value: food.quantity.value,
    unit: food.quantity.unit
  });

  const onSaveHook = async (token: string | undefined, food: Food) => {
    await consumeFood(token, food);
    router.push(`/food/`);
  };

  return (
    <View style={food_details_screen.container}>
      <Text style={food_details_screen.title}> {food.name}</Text>
      <Overview food={food} quantityConsumed={quantityConsumed} setQuantityConsumed={setQuantityConsumed}/>
      <Pressable onPress={() => onSaveHook(userContext?.token, food)}>
        <Image
          source={require("@/assets/images/save.png")}
          style={{ marginRight: 0 }}
        />
      </Pressable>
    </View>
  );
}
