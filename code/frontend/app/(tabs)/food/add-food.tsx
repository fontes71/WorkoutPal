import { FlatList, ScrollView, StyleSheet } from "react-native";
import { Image } from "expo-image";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { Link, Stack } from "expo-router";
import { SearchBar } from "@rneui/themed";
import { useState, useEffect } from "react";
import { Food } from "@/domain/types";

const capitalizeWords = (str: string) =>
  str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

const BottomText = ({ str }: { str: string }) => (
  <Text style={styles.bottomText}>{str}</Text>
);

const FoodResult: React.FC<Food> = ({
  name,
  imageUrl,
  brand,
  calories,
  quantity,
}) => {
  const nameString = name || brand;
  const brandString = name && brand ? brand : `-`;
  const caloriesString = `${calories || "-"} cal`;
  const quantityString = quantity || "-";

  return (
    <>
      {nameString && (
        <View style={styles.foodResultContainer}>
          <View style={styles.imageContainer}>
            {imageUrl && (
              <Image style={styles.foodResultImg} source={imageUrl} contentFit="cover" />
            )}
          </View>
          <View style={styles.foodResultTextContainer}>
            <Text style={styles.topText}>{capitalizeWords(nameString)}</Text>
            <View style={styles.bottomTextContainer}>
              <BottomText str={capitalizeWords(brandString)} />
              <BottomText str={caloriesString} />
              <BottomText str={quantityString} />
            </View>
          </View>
        </View>
      )}
    </>
  );
};

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
    flex: 1,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    padding: 10,
  },
  imageContainer: {
    width: 100,
    height: 100,
  },
  foodResultImg: {
    flex: 1
  },
  foodResultTextContainer: {
    flex: 1,
    alignItems: "center",
    height: 90,
    justifyContent: "space-evenly",
  },
  bottomTextContainer: {
    flexDirection: "row",
  },
  topText: {
    fontWeight: "bold",
  },
  bottomText: {
    marginHorizontal: 16,
  },
});
