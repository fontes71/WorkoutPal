import { Text, View } from "@/components/Themed";
import { Stack, Link } from "expo-router";
import { exercise_styles } from "@/assets/styles/exercises";
import { StatusBar } from "expo-status-bar";
import { useContext } from "react";
import { UserContext } from "@/assets/components/auth/AuthContext";

export default function App() {
  const userContext = useContext(UserContext);
  let workoutPlansRef = "/exercise/workoutPlans";
  if(userContext === null) {
    workoutPlansRef = "/auth/login";
  }
  return (
    <View style={exercise_styles.container}>
      <Stack.Screen options={{ title: "Exercise", headerShown: true }} />
      <Link style={exercise_styles.link} href={"/exercise/search-exercise"}>
        Search Exercise
      </Link>
      <Link style={exercise_styles.link} href={workoutPlansRef}>
        Workout Plans
      </Link>
    </View>
  );
}
