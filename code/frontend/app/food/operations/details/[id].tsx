import { food_details_screen } from "@/assets/styles/food";
import { Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import FoodCover from "@/assets/components/FoodCover";
import OverviewText from "@/assets/components/food/details/overviewText/OverviewText";
import Quantity from "@/assets/components/food/details/quantity/Quantity";
import More from "@/assets/components/food/details/more/More";
import { useContext } from "react";
import { UserContext } from "@/assets/components/auth/AuthContext";
import { Image, Pressable } from "react-native";
import { Stack, router } from "expo-router";
import { consumeFood } from "@/services/food";


export default function FoodDetailsScreen() {
  const { foodJSON } = useLocalSearchParams<{ foodJSON: string }>();
  if (!foodJSON) return <Text>Error</Text>;
  const food = JSON.parse(foodJSON) as Food;



  //simplificar isto
  const { userContext } = useContext(UserContext);
  console.log(userContext)
  const onSaveHook = async (food: Food) => {
    if (!userContext) {
      router.push(`/auth/login/`);
      return;
    }

    await consumeFood(userContext?.token, food);

    router.push(`/food/`);
  };

  return (
    <View style={food_details_screen.container}>
      <Text style={food_details_screen.title}> {food.name}</Text>
      <View style={food_details_screen.overview}>
        <FoodCover imageUrl={food.imageUrl} />
        <OverviewText
          calories={food.calories}
          carbs={food.carbs}
          fat={food.fat}
          protein={food.protein}
        />
      </View>
      <Quantity quantity={food.quantity} quantityUnit={food.quantityUnit} />
      <More
        fiber={food.fiber}
        saturatedFats={food.saturatedFat}
        salt={food.salt}
        sodium={food.sodium}
        sugars={food.sugars}
        nutriscoreGrade={food.nutriscoreGrade}
      />
      <Pressable onPress={() => onSaveHook(food)}>
      <Image
              source={require("@/assets/images/save.png")}
              style={{ marginRight: 0 }}
            />
      </Pressable>
    </View>
  );
}
