import { food_details_screen } from "@/assets/styles/food";
import { Text, View } from "@/components/Themed";
import { useLocalSearchParams } from "expo-router";
import FoodCover from "@/assets/components/FoodCover";
import TopSection from "@/assets/components/food/details/topSection/TopSection";
import OverviewText from "@/assets/components/food/details/overviewText/OverviewText";
import Quantity from "@/assets/components/food/details/quantity/Quantity";
import More from "@/assets/components/food/details/more/More";

export default function FoodDetailsScreen() {
  const { foodJSON } = useLocalSearchParams<{ foodJSON: string }>();
  if (!foodJSON) return <Text>Error</Text>;
  const food = JSON.parse(foodJSON) as Food;

  return (
    <View style={food_details_screen.container}>
      <TopSection food={food} />
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
    </View>
  );
}
