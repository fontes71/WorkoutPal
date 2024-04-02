import { StyleSheet } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { Link, Stack } from "expo-router";
import { useLocalSearchParams } from 'expo-router';

export default function FoodDetailsScreen() {
  const { id } = useLocalSearchParams();
  return (
    <View style={styles.container}>
       <Stack.Screen options={{ title: "Food Details" }} />
      <Link style={styles.link} href={"/food/search-food"}>
      {id}
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  link: {
    marginTop: 20,
  },
});
