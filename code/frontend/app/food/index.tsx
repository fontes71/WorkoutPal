import { food_styles } from "@/assets/styles/food";
import { View } from "react-native";
import { Link } from "expo-router";
import { useContext, useState } from "react";
import { UserContext } from "@/assets/components/auth/AuthContext";
import ConsumedFood from "@/assets/components/food/consumedFood/consumedFood/ConsumedFood";
import NutrientsOverview from "@/assets/components/food/consumedFood/nutrientsOverview/NutrientsOverview";
import fetchConsumedFoodHook from "@/assets/components/food/utils";

export default function FoodScreen() {
  const [food, setFood] = useState<Food[] | null>(null);
  const { userContext } = useContext(UserContext);
  
  fetchConsumedFoodHook(userContext, setFood)
 
  return (
    <View style={food_styles.container}>
      <NutrientsOverview food={food} />
      <ConsumedFood food={food} setFood={setFood}/>
      <Link style={food_styles.link} href={"food/search-food"} >
        Add Food +
      </Link>
    </View>
  );
}
