import { Link } from "expo-router";
import { exercise_styles } from "@/assets/styles/exercises";
import React from "react";
import { View } from "react-native";

export default function ExerciseScreen() {
  return (
    <View style={exercise_styles.container}>
      <Link style={exercise_styles.link} href="/exercises/search-exercise">
        Search Exercises
      </Link>
      <Link style={exercise_styles.link} href="/exercises/workoutPlans">
        Workout Plans
      </Link>
    </View>
  )
}


