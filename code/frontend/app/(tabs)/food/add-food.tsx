import { StyleSheet } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { Link, Stack } from "expo-router";
import { SearchBar } from '@rneui/themed';
import { useState, useEffect } from "react";

export default function AddFoodScreen() {
  const [query, setQuery] = useState("");
  const [food, setFood] = useState([]);

  

  useEffect(() => {
    const fetchFood = async () => {

      const response = await fetch(`http://192.168.1.96:8080/api/food/search?query=${query}`);
      const food = await response.json();
      console.log("value => ", food)
      setFood(food);
    }
    fetchFood();
  }, [query])

  const updateQuery = (value: string) => {
    setQuery(value);
  };

  return (
    <View >
      <Stack.Screen options={{ title: "Adding food" }} />
      <SearchBar
      placeholder="Type Here..."
      onChangeText={updateQuery}
      value={query}
    />
    {food.map(({product_name}) => <Text>{product_name}</Text>)}
    </View>
  );
}

const styles = StyleSheet.create({

});
