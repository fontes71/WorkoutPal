import { Link } from "expo-router";
import { exercise_styles } from "@/assets/styles/exercises";
import React from "react";
import { View, Text, Image } from "react-native";
import { Colors } from "@/assets/styles/common";
import WorkoutPlansScreen from "./workoutPlans";

export default function ExerciseScreen() {
  return (
    <View style={exercise_styles.container}>
      <View style={exercise_styles.linksContainer}>
        <Image source={require('@images/magnifying-glass_white.png')} style={{ width: 20, height: 20 }}/>
        <Link style={exercise_styles.link} href="/fitness/search-exercise">
          Search Exercises
        </Link>
      </View>
      <View style={exercise_styles.workoutPlansContainer}>
        <Text style={exercise_styles.title}>Workout Plans</Text> 
        <WorkoutPlansScreen />
      </View>
    </View>
  )
}