import { StyleSheet } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { Link, Stack } from "expo-router";

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
       <Stack.Screen options={{ title: "Food" }} />
      <Link style={styles.link} href={"/food/add-food"}>
        Add Food +
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
