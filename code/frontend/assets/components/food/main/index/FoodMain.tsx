import { food_styles } from "@/assets/styles/food";
import { View } from "react-native";
import { Link } from "expo-router";
import { useContext, useState } from "react";
import { UserContext } from "@/assets/components/auth/AuthContext";
import NutrientsOverview from "@/assets/components/food/main/nutrientsOverview/NutrientsOverview";
import fetchConsumedFoodHook from "./utils";
import LoggedFood from "../loggedFood/LoggedFood";


const FoodMain = () => {
  const { userContext } = useContext(UserContext);
  const [food, setFood] = useState<Food[] | null>(null);
  
  
  fetchConsumedFoodHook(userContext, setFood)
 
  return (
    <View style={food_styles.container}>
      <NutrientsOverview food={food} />
      <LoggedFood food={food} setFood={setFood}/>
      <Link style={food_styles.link} href={"food/search-food"} >
        Add Food +
      </Link>
    </View>
  );
}

export default FoodMain
