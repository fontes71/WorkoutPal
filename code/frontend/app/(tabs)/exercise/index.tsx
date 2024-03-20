import { StyleSheet } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { Stack, Link } from "expo-router";

export default function ExerciseScreen() {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Exercise" }} />
      <Link style={styles.link} href={"/exercise/search-exercise"}>
        Search Exercise
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
    marginTop: 20
  },
});