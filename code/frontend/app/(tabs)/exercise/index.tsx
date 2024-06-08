import { StyleSheet } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { Stack, Link } from "expo-router";
import { exercise_styles } from "@/assets/styles/exercises";
import { useContext } from "react";
import { UserContext } from "@/assets/components/auth/AuthContext";

export default function ExerciseScreen() {
  const userContext = useContext(UserContext);
  let workoutPlansRef = "/exercise/workoutPlans";
  if(userContext === null) {
    workoutPlansRef = "/auth/login";
  }
  return (
    <View style={exercise_styles.container}>
      <Stack.Screen options={{ title: "Exercise" }} />
      <Link style={exercise_styles.link} href={"/exercise/search-exercise"}>
        Search Exercises
      </Link>
      <Link style={exercise_styles.link} href={workoutPlansRef}>
        Workout Plans
      </Link>
    </View>
  );
}