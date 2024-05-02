import { FlatList, Pressable } from "react-native";
import { Image } from "expo-image";
import { food_search_styles } from "@/utils/styles/food";
import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { Link, Stack, router } from "expo-router";
import { SearchBar } from "@rneui/themed";
import { useState, useEffect } from "react";
import { Food } from "@/domain/types";
import { localhost } from "@/constants";
import { Linking, TouchableOpacity } from "react-native";
import FoodCover from "@/utils/components/FoodCover";
import { searchFood } from "@/services/food";
import foodItemRoute from "@/utils/functions/foodItemRoute";

const capitalizeWords = (str: string | null) => {
  if (str === null) {
    return null;
  }

  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const BottomText = ({ str }: { str: string | null }) => (
  <>{str && <Text style={food_search_styles.bottomText}>{str}</Text>}</>
);

const addCommaIfNeeded = (noComma: boolean, str: string) =>
  noComma ? str : `${str}, `;


interface FoodResultInfoProps {
  nameString: string;
  brandString: string;
  calorieString: string;
  quantity: string;
}

const FoodResultInfo: React.FC<FoodResultInfoProps> = ({ nameString, brandString, calorieString, quantity }) => (
  <View style={food_search_styles.foodResultTextContainer}>
    <Text style={food_search_styles.topText}>{capitalizeWords(nameString)}</Text>
    <BottomText
      str={
        capitalizeWords(brandString) +
        calorieString +
        quantity
      }
    />
  </View>
);

const FoodResult: React.FC<Food> = ({
  name,
  imageUrl,
  brand,
  calories,
  quantity,
}) => {
  const nameString = name || brand;
  let brandString = name && brand ? brand : ``;
  let caloriesString = calories ? `${calories} cal ` : ``;

  brandString = addCommaIfNeeded(
    !(brandString && (caloriesString || quantity)),
    brandString
  );
  caloriesString = addCommaIfNeeded(
    !(caloriesString && quantity),
    caloriesString
  );
  return (
    <>
      {nameString && (
        <View style={food_search_styles.foodResultContainer}>
          <FoodCover imageUrl={imageUrl} />
          <FoodResultInfo
            nameString={nameString}
            brandString={brandString}
            calorieString={caloriesString}
            quantity={quantity}
          />
        </View>
      )}
    </>
  );
};

export default function AddFoodScreen() {
  const [query, setQuery] = useState("");
  const [foodResults, setFood] = useState<Food[]>([]);

  const handleEnter = () => {
    const fetchFoodResults = async () => {
      const food: Food[] = await searchFood(query);

      setFood(food);
    };
    if (query.length > 1) fetchFoodResults();
  };

  const updateQuery = (value: string) => {
    setQuery(value);
  };

    const handleFoodPress = async (food: Food) => {
    router.push(foodItemRoute(food));
  };

  return (
    <View>
      <Stack.Screen options={{ title: "Search food" }} />
      <SearchBar
        placeholder="Type Here..."
        onSubmitEditing={handleEnter}
        returnKeyType="search"
        onChangeText={updateQuery}
        value={query}
      />
      <FlatList
        data={foodResults}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => {
              handleFoodPress(item);
            }}
          >
            <FoodResult key={item.id} {...item} />
          </Pressable>
        )}
      />
    </View>
  );
}


