import { Link } from "expo-router";
import { exercise_styles } from "@/assets/styles/exercises";
import React from "react";
import { View } from "react-native";
import Layout from "@/assets/components/general/Layout";

export default function ExerciseScreen() {
  return (
    <Layout>
      <Content />
    </Layout>
  )
}

const Content = () => {
  return(
    <View style={exercise_styles.container}>
      <Link style={exercise_styles.link} href="/exercises/operations/search-exercise">
        Search Exercises
      </Link>
      <Link style={exercise_styles.link} href="/exercises/operations/workoutPlans">
        Workout Plans
      </Link>
    </View>
  )
}

