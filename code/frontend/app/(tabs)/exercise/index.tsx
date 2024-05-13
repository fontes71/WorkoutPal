import { StyleSheet } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { Stack, Link } from "expo-router";
import { exercise_styles } from "@/assets/styles/exercises";

export default function ExerciseScreen() {
  return (
    <View style={exercise_styles.container}>
      <Stack.Screen options={{ title: "Exercise" }} />
      <Link style={exercise_styles.link} href={"/exercise/search-exercise"}>
        Search Exercises
      </Link>
      <Link style={exercise_styles.link} href={"/exercise/trainingPlans"}>
        Training Plans
      </Link>
    </View>
  );
}