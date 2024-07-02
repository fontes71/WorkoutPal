import { UserContext } from "@/assets/components/auth/AuthContext";
import { getFood } from "@/assets/components/food/details/index/utils";
import FoodMain from "@/assets/components/food/main/index/FoodMain";
import { useLocalSearchParams } from "expo-router";
import { useContext } from "react";


export default function FoodScreen() {
  return <FoodMain />;
}
