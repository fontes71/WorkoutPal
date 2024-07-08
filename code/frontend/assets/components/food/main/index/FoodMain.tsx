
import { View } from "react-native";
import { useContext, useState } from "react";
import { UserContext } from "@/assets/components/auth/AuthContext";
import NutrientsOverview from "@/assets/components/food/main/nutrientsOverview/NutrientsOverview";
import fetchConsumedFoodHook from "./utils";
import LoggedFood from "../loggedFood/LoggedFood";
import styles from "./styles";
import AddFoodLink from "../addFoodLink/AddFoodLink";


const FoodMain = () => {
  const { userContext } = useContext(UserContext);
  const [food, setFood] = useState<Food[] | null>(null);
  
  
  fetchConsumedFoodHook(userContext, setFood)
 
  return (
    <View style={styles.container}>
      <NutrientsOverview food={food}/>
      <LoggedFood food={food} setFood={setFood}/>
      <AddFoodLink />
    </View>
  );
}

export default FoodMain
