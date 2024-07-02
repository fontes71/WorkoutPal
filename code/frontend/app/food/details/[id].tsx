
import { UserContext } from "@/assets/components/auth/AuthContext";
import Details from "@/assets/components/food/details/index/Details";
import { FoodDetailsHookType } from "@/assets/components/food/details/index/types";
import { getFood, getHookType, logHook, updateHook } from "@/assets/components/food/details/index/utils";
import { useLocalSearchParams } from "expo-router";
import React, { useContext } from "react";



export default function FoodDetailsScreen() {

  const { logIndex } = useLocalSearchParams<{ logIndex: string }>();
  const { userContext } = useContext(UserContext);
  const food = getFood();
  const hookType = getHookType()
  if (!food || !userContext) throw Error;

  const update = (token: string | undefined, food: Food, quantity: ValueAndUnit, mainNutrients: MainNutrients, secondaryNutrients: SecondaryNutrients) =>  updateHook(token, food, quantity, mainNutrients, secondaryNutrients, logIndex as string)
  
  const hook = hookType == FoodDetailsHookType.Log ? logHook : update
  
  return <Details user={userContext} food={food} hook={hook}/>;
}
