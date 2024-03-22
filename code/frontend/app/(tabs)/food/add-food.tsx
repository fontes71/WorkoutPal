import { FlatList, ScrollView, StyleSheet } from "react-native";
import { Image } from "expo-image";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { Link, Stack } from "expo-router";
import { SearchBar } from "@rneui/themed";
import { useState, useEffect } from "react";
import { Food } from "@/domain/types";

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
  <>{str && <Text style={styles.bottomText}>{str}</Text>}</>
);

const addCommaIfNeeded = (noComma: boolean, str: string) => noComma ? str : `${str}, `

const FoodResult: React.FC<Food> = ({
  name,
  imageUrl,
  brand,
  calories,
  quantity,
}) => {
  const nameString = name || brand;
  const brandString = name && brand ? brand : ``;
  const caloriesString = calories ? `${calories} cal ` : ``;
  
  const brandStringWithComma = addCommaIfNeeded(!(brandString && (caloriesString || quantity)), brandString)
  const calorieStringWithComma = addCommaIfNeeded(!(caloriesString && quantity), caloriesString)
  return (
    <>
      {nameString && (
        <View style={styles.foodResultContainer}>
          <View style={styles.imageContainer}>
            {imageUrl && (
              <Image
                style={styles.foodResultImg}
                source={imageUrl}
                contentFit="cover"
              />
            )}
          </View>
          <View style={styles.foodResultTextContainer}>
            <Text style={styles.topText}>{capitalizeWords(nameString)}</Text>
            <BottomText str={capitalizeWords(brandStringWithComma) + calorieStringWithComma + quantity} />
          </View>
        </View>
      )}
    </>
  );
};

/* 
const FoodResult: React.FC<Food> = ({
  name,
  imageUrl,
  brand,
  calories,
  quantity,
}) => {
  const nameString = name || brand;
  const brandString = name && brand ? brand : null;
  const caloriesString = calories ? `${calories} cal ` : null;
  const quantityString = quantity;

  return (
    <>
      {nameString && (
        <View style={styles.foodResultContainer}>
          <View style={styles.imageContainer}>
            {imageUrl && (
              <Image
                style={styles.foodResultImg}
                source={imageUrl}
                contentFit="cover"
              />
            )}
          </View>
          <View style={styles.foodResultTextContainer}>
            <Text style={styles.topText}>{"aaaaaaaaaa aaaaaaaaaaaa aaaaaaaaaaa a aa aaaaa aa aaaaaaaaa"}</Text>
            <View style={styles.bottomTextContainer}>
              <BottomText str={"bbbbb bbbbbbbbb bbbbbb bbbbbbb bbbb"} />
              <BottomText str={"cccc ccc ccccccc cccccc"} />
              <BottomText str={quantityString} />
            </View>
          </View>
        </View>
      )}
    </>
  );
}; */

export default function AddFoodScreen() {
  const [query, setQuery] = useState("");
  const [food, setFood] = useState<Food[]>([]);

  const handleEnter = () => {
    const fetchFood = async () => {
      const response = await fetch(
        `http://192.168.1.96:8080/api/food/search?query=${query}`
      );
      const food: Food[] = await response.json();

      setFood(food);
    };
    if (query.length > 1) fetchFood();
  };

  const updateQuery = (value: string) => {
    setQuery(value);
  };

  return (
    <View>
      <Stack.Screen options={{ title: "Adding food" }} />
      <SearchBar
        placeholder="Type Here..."
        onSubmitEditing={handleEnter}
        returnKeyType="search"
        onChangeText={updateQuery}
        value={query}
      />
      <FlatList
        data={food}
        renderItem={({ item }) => <FoodResult {...item} />}
        keyExtractor={(item: Food) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  foodResultContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    padding: 10,
  },
  imageContainer: {
    width: 90,
    height: 90,
    marginRight: 10,
  },
  foodResultImg: {
    flex: 1,
  },
  foodResultTextContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  bottomTextContainer: {
    flexDirection: "row",
  },
  topText: {
    fontWeight: "bold",
    paddingBottom: 5,
    fontSize: 18
  },
  bottomText: {
    marginRight: 10,
    fontSize: 14
  },
});
