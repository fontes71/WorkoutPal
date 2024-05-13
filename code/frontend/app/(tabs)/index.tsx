import { Text, View } from "@/components/Themed";
import { Stack, Link } from "expo-router";
import { exercise_styles } from "@/assets/styles/exercises";
import { StatusBar } from "expo-status-bar";

export default function App() {
  return (
    <View style={exercise_styles.container}>
      <Stack.Screen options={{ title: "Exercise", headerShown: true }} />
      <Link style={exercise_styles.link} href={"/exercise/search-exercise"}>
        Search Exercise
      </Link>
    </View>
  );
}
