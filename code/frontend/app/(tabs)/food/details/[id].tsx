import {  TouchableOpacity, Image } from "react-native";
import { food_details_styles } from "@/assets/styles/food";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { Link, Stack } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import FoodCover from "@/app/utils/components/FoodCover";
import { Food } from "@/domain/types";
import { useState } from "react";

const displayMacro = (value: number) => (value ? `${value}g` : "-");
const display = (value: string) => (value ? `${value}` : "-");

interface QuantityProps {
  quantity: string;
  quantityUnit: string;
}

const Quantity: React.FC<QuantityProps> = ({ quantity, quantityUnit }) => (
  <View style={food_details_styles.quantityContainer}>
    <Text style={food_details_styles.text_small}>{display(quantity)}</Text>
    {quantity && <Text style={food_details_styles.text_small}>{quantityUnit}</Text>}
  </View>
);

interface MacronutrientProps {
  value: number;
}

const Macronutrient: React.FC<MacronutrientProps> = ({ value }) => (
  <Text style={food_details_styles.text_small}> {displayMacro(value)} </Text>
);

interface OverviewTextProps {
  calories: number;
  carbs: number;
  fat: number;
  protein: number;
}

const OverviewText: React.FC<OverviewTextProps> = ({
  calories,
  carbs,
  fat,
  protein,
}) => (
  <View style={food_details_styles.overviewText}>
    <Text style={food_details_styles.text_medium}> {calories} cal </Text>
    <View style={food_details_styles.macronutrientsContainer}>
      <Macronutrient value={carbs} />
      <Macronutrient value={fat} />
      <Macronutrient value={protein} />
    </View>
  </View>
);

const More = () => {
  const [buttonClicked, setButtonClicked] = useState(false);

  return (
    <View style={food_details_styles.moreContainer}>
      <TouchableOpacity
        onPress={() => setButtonClicked(!buttonClicked)}
        style={food_details_styles.moreButton}
      >
        <Text style={food_details_styles.text_small}>More</Text>
        <Image
          source={require("@/assets/images/down-arrow.png")}
          style={food_details_styles.arrowIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

const TopSection = () => (
  <Stack.Screen
    options={{
      headerTitle: (props) => <Text style={{ fontSize: 18 }}>Add Food</Text>,
      headerRight: (props) => (
        <Image
          source={require("@/assets/images/save.png")}
          style={{ marginRight: 0 }}
        />
      ),
      headerTitleAlign: "left",
    }}
  />
);

export default function FoodDetailsScreen() {
  const { foodJSON } = useLocalSearchParams<{ foodJSON: string }>();
  const food = JSON.parse(foodJSON) as Food;

  return (
    <View style={food_details_styles.container}>
      <TopSection />
      <Text style={food_details_styles.title}> {food.name}</Text>
      <View style={food_details_styles.overview}>
        <FoodCover imageUrl={food.imageUrl} />
        <OverviewText
          calories={food.calories}
          carbs={food.carbs}
          fat={food.fat}
          protein={food.protein}
        />
      </View>
      <Quantity quantity={food.quantity} quantityUnit={food.quantityUnit} />
      <More />
    </View>
  );
}

