import { TouchableOpacity, Image, Pressable } from "react-native";
import { food_details_styles } from "@/utils/styles/food";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { Link, Stack, router } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import FoodCover from "@/utils/components/FoodCover";
import { Food } from "@/domain/types";
import { useState } from "react";
import { localhost } from "@/constants";
import { consumeFood } from "@/services/food";

const display = (value: string) => (value ? `${value}` : "-");

interface QuantityProps {
  quantity: string;
  quantityUnit: string;
}

const Quantity: React.FC<QuantityProps> = ({ quantity, quantityUnit }) => (
  <View style={food_details_styles.quantityContainer}>
    <Text style={food_details_styles.text_small}>{display(quantity)}</Text>
    {quantity && (
      <Text style={food_details_styles.text_small}>{quantityUnit}</Text>
    )}
  </View>
);

interface MacronutrientProps {
  value: string | null;
}

const Macronutrient: React.FC<MacronutrientProps> = ({ value }) => (
  <Text style={food_details_styles.text_small}> {value} </Text>
);

interface OverviewTextProps {
  calories: number;
  carbs: string | null;
  fat: string | null;
  protein: string | null;
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

interface MoreButtonProps {
  buttonClicked: boolean;
  setButtonClicked: React.Dispatch<React.SetStateAction<boolean>>;
}

interface InfoTextProps {
  label: string;
  value: any;
}

const InfoText: React.FC<InfoTextProps> = ({ label, value }) => (
  <Text>
    {label}: {value}
  </Text>
);

interface MoreProps {
  fiber: string | null;
  saturatedFats: string | null;
  salt: string | null;
  sodium: string | null;
  sugars: string | null;
  nutriscoreGrade: string | null;
}

const MoreInfo: React.FC<MoreProps> = ({
  fiber,
  saturatedFats,
  salt,
  sodium,
  sugars,
  nutriscoreGrade,
}) => (
  <View style={food_details_styles.moreInfoContainer}>
    <InfoText label="Fiber" value={fiber} />
    <InfoText label="Saturated Fats" value={saturatedFats} />
    <InfoText label="Salt" value={salt} />
    <InfoText label="Sodium" value={sodium} />
    <InfoText label="Sugars" value={sugars} />
    <InfoText label="Nutriscore Grade" value={nutriscoreGrade} />
  </View>
);
const MoreButton: React.FC<MoreButtonProps> = ({
  buttonClicked,
  setButtonClicked,
}) => (
  <TouchableOpacity
    onPress={() => setButtonClicked(!buttonClicked)}
    style={food_details_styles.moreButton}
  >
    <Text style={food_details_styles.text_small}>
      {buttonClicked ? "Less" : "More"}
    </Text>
    <Image
      source={require("@/assets/images/down-arrow.png")}
      style={food_details_styles.arrowIcon}
    />
  </TouchableOpacity>
);

const More: React.FC<MoreProps> = ({
  fiber,
  saturatedFats,
  salt,
  sodium,
  sugars,
  nutriscoreGrade,
}) => {
  const [buttonClicked, setButtonClicked] = useState(false);

  return (
    <View style={food_details_styles.moreContainer}>
      <MoreButton
        buttonClicked={buttonClicked}
        setButtonClicked={setButtonClicked}
      />
      {buttonClicked && (
        <MoreInfo
          fiber={fiber}
          saturatedFats={saturatedFats}
          salt={salt}
          sodium={sodium}
          sugars={sugars}
          nutriscoreGrade={nutriscoreGrade}
        />
      )}
    </View>
  );
};

interface TopSectionProps {
  food: Food;
}

const TopSection: React.FC<TopSectionProps> = ({ food }) => {
  const onSaveHook = async (food: Food) => {
    await consumeFood(food);

    router.push(`/food/`);
  };

  return (
    <Stack.Screen
      options={{
        headerTitle: "Add Food",
        headerRight: () => (
          <Pressable onPress={() => onSaveHook(food)}>
            <Image
              source={require("@/assets/images/save.png")}
              style={{ marginRight: 0 }}
            />
          </Pressable>
        ),
        headerTitleAlign: "left",
      }}
    />
  );
};

export default function FoodDetailsScreen() {
  const { foodJSON } = useLocalSearchParams<{ foodJSON: string }>();
  const food = JSON.parse(foodJSON) as Food;

  return (
    <View style={food_details_styles.container}>
      <TopSection food={food} />
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
