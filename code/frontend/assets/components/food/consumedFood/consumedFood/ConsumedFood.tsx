import { Text, Touchable, TouchableWithoutFeedback, View } from "react-native";
import { food_styles } from "@/assets/styles/food";
import { Link, Stack, router } from "expo-router";
import { useContext, useEffect, useState } from "react";
import getDate from "@/assets/functions/getDate";
import foodItemRoute from "@/assets/functions/foodItemRoute";
import { consumedFoodOfTheDay } from "@/services/food";
import { UserContext } from "@/assets/components/auth/AuthContext";
import NutrientsOverview from "@/assets/components/food/consumedFood/nutrientsOverview/NutrientsOverview";
import Layout from "@/assets/components/general/Layout";
import fetchConsumedFoodHook from "@/assets/components/food/utils";


const ConsumedFood: React.FC<ConsumedFoodProps> = ({ food }) => {
  const [item, itemToDelete] = useState<Food | null>(null)

  const handlePress = async (food: Food) => {
    router.push(foodItemRoute(food));
  };

  const handleLongPress = async (item: Food) => {
    itemToDelete(item)
    console.log("long press")
  };



  return (
  <>
    {food && (
      <View>
        {food.map((item, index) => (
          <TouchableWithoutFeedback onPress={() => handlePress(item)} key={index} onLongPress={() => handleLongPress(item)}> 
            <Text>{item.name}</Text>
          </TouchableWithoutFeedback>
        ))}
      </View>
    )}
  </>
  )

}

export default ConsumedFood;
