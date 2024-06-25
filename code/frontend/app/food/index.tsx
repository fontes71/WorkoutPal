import { food_styles } from "@/assets/styles/food";
import { View } from "react-native";
import { Link, Stack, router } from "expo-router";
import { useContext, useEffect, useState } from "react";
import getDate from "@/assets/functions/getDate";
import foodItemRoute from "@/assets/functions/foodItemRoute";
import { consumedFoodOfTheDay } from "@/services/food";
import { UserContext } from "@/assets/components/auth/AuthContext";
import ConsumedFood from "@/assets/components/food/consumedFood/consumedFood/ConsumedFood";
import NutrientsOverview from "@/assets/components/food/consumedFood/nutrientsOverview/NutrientsOverview";
import Layout from "@/assets/components/general/Layout";
import fetchConsumedFoodHook from "@/assets/components/food/utils";


export default function FoodScreen() {
  return(
    <Layout>
      <Component />
    </Layout>
  )
}

const Component = () => {
  const [food, setFood] = useState<Food[] | null>(null);
  const { userContext } = useContext(UserContext);
  
  fetchConsumedFoodHook(userContext, setFood)
 
  console.log(userContext)



  return (
    <View style={food_styles.container}>
      <NutrientsOverview food={food} />
      <ConsumedFood food={food} />
      <Link style={food_styles.link} href={"food/operations/search-food"} >
        Add Food +
      </Link>
    </View>
  );
}
