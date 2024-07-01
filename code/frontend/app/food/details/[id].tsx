import { food_details_screen } from "@/assets/styles/food";
import { Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/assets/components/auth/AuthContext";
import { Image, Pressable } from "react-native";
import { router } from "expo-router";
import { logFood } from "@/services/food";
import Overview from "@/assets/components/food/details/overview/Overview";
import { getFood, updateNutrients } from "@/assets/components/food/details/utils/utils";


export default function FoodDetailsScreen() {
  const { userContext } = useContext(UserContext);
  const food = getFood();
  if (!food) return <Text>Error</Text>;

  const [quantity, setQuantity] = useState<ValueAndUnit>(
    food.quantity
  );
  const [mainNutrients, setMainNutrients] = useState<MainNutrients>(
    food.mainNutrients
  );
  const [secondaryNutrients, setSecondaryNutrients] =
    useState<SecondaryNutrients>(food.secondaryNutrients);

  const onSave = async (token: string | undefined, food: Food) => {
    await logFood(token, food);
    router.push(`/food/`);
  };

 const updateQuantity = (newQuantity: ValueAndUnit) => {
  let quant = quantity
  if (quant.value == 0) {
    quant = food.quantity
    setMainNutrients(food.mainNutrients)
    setSecondaryNutrients(food.secondaryNutrients)

  }
  
  updateNutrients(quant, newQuantity, setMainNutrients, setSecondaryNutrients)
  setQuantity(newQuantity)
 }

  return (
    <View style={food_details_screen.container}>
      <Text style={food_details_screen.title}> {food.name}</Text>
      <Overview
        food={food}
        quantity={quantity}
        updateQuantity={updateQuantity}
        mainNutrients={mainNutrients}
        secondaryNutrients={secondaryNutrients}
      />
      <Pressable onPress={() => onSave(userContext?.token, food)}>
        <Image
          source={require("@/assets/images/save.png")}
          style={{ marginRight: 0 }}
        />
      </Pressable>
    </View>
  );
}

