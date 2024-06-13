import {
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { Stack, router } from "expo-router";
import { SearchBar } from "@rneui/themed";
import { useState, useEffect } from "react";
import { Exercise, ExerciseResponse } from "@/domain/exercise";
import { localhost } from "@/constants";
import search_exercises_styles from "@/assets/styles/exercises";

const BottomText = ({ str }: { str: string | null }) => (
  <>{str && <Text style={search_exercises_styles.bottomText}>{str}</Text>}</>
);

const ExerciseResult: React.FC<Exercise> = ({ name, gifUrl, equipment }) => {
  return (
    <View style={search_exercises_styles.exerciseResultContainer}>
      <View style={search_exercises_styles.imageContainer}>
        {gifUrl && (
          <Image
            style={search_exercises_styles.exerciseGifResult}
            source={{ uri: gifUrl }}
          />
        )}
      </View>
      <View style={search_exercises_styles.exerciseResultTextContainer}>
        <Text style={search_exercises_styles.topText}>{name}</Text>
        <BottomText str={"Equipment: " + equipment} />
      </View>
    </View>
  );
};

const removeParenthesesFromExerciseName = (exercises: Exercise[]) => {
  for (let i = 0; i < exercises.length; i++) {
    if (exercises[i].name.endsWith(")")) {
      exercises[i].name = exercises[i].name.slice(
        0,
        exercises[i].name.lastIndexOf("(")
      );
    }
  }
  return exercises;
};

export default function SearchExerciseScreen() {
  const [exerciseName, setExerciseName] = useState("");
  const [exercises, setExercises] = useState<Exercise[]>([]);

  const handleEnter = () => {
    const fetchExercise = async () => {
      const response = await fetch(
        `${localhost}8080/api/exercises/name/${exerciseName}`
      );

      if (response.status !== 200) {
        const errorMessage: ExerciseResponse = await response.json();
        alert(errorMessage.message);
        return;
      }

      const exercises: ExerciseResponse = await response.json();
      const modifiedExercises: Exercise[] = removeParenthesesFromExerciseName(
        exercises.obj
      );
      setExercises(modifiedExercises);
    };

    if (exerciseName.length > 1) fetchExercise();
  };

  const updateExerciseName = (value: string) => {
    setExerciseName(value);
  };

  const handleExercisePress = async (exercise: Exercise) => {
    router.push({
      pathname: `/exercise/exercise-details/${exercise._id}`,
      params: { exerciseJSON: JSON.stringify(exercise) },
    });
  };

  return (
    <View>
      <Stack.Screen options={{ title: "Search exercise" }} />
      <SearchBar
        placeholder="Type Here..."
        onSubmitEditing={handleEnter}
        returnKeyType="search"
        onChangeText={updateExerciseName}
        value={exerciseName}
      />
      <FlatList
        data={exercises}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => {
              handleExercisePress(item);
            }}
          >
            <ExerciseResult {...item} />
          </Pressable>
        )}
        keyExtractor={(item: Exercise) => item._id}
      />
    </View>
  );
}
