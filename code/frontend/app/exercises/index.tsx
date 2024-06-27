import { Link } from "expo-router";
import { exercise_styles } from "@/assets/styles/exercises";
import React from "react";
import { View } from "react-native";
import { Colors } from "@/constants";

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

function ExerciseScreenDarkModeTest() {
  return (
    <View style={[exercise_styles.container, {height: "100%", justifyContent: "center", paddingBottom: 50}]}>
      <Link style={[exercise_styles.link, {borderRadius: 15, textAlign: "center", color: Colors.black, backgroundColor: Colors.lightBlue, width: "80%"}]} href="/exercises/search-exercise">
        Search Exercises
      </Link>
      <Link style={[exercise_styles.link, {borderRadius: 15, textAlign: "center", color: Colors.black, backgroundColor: Colors.lightBlue, width: "80%"}]} href="/exercises/workoutPlans">
        Workout Plans
      </Link>
    </View>
  )
}


