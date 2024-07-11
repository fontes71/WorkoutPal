import { Image, Text, View } from "react-native";
import { useLocalSearchParams, Stack } from "expo-router";
import { Button } from "@rneui/base";
import exercise_screen_styles from "@/assets/styles/exercises";
import WorkoutPlansModalScreen from "@/assets/components/modals/workoutPlan";
import { useState } from "react";
import { BottomText } from "@/assets/components/exercises/bottomText";
import { Colors } from "@/assets/styles/common";

const ExerciseDetailsScreen = () => {
  const { exerciseJSON } = useLocalSearchParams<{ exerciseJSON: string }>();
  if (!exerciseJSON) {
    return <Text>Exercise not found</Text>;
  }
  const exercise = JSON.parse(exerciseJSON) as Exercise;

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View>
      <Stack.Screen options={{ title: "Details" }} />
      <View style={exercise_screen_styles.exercisesResultContainer}>
        <View style={exercise_screen_styles.exerciseResultTextContainer}>
          <Text style={exercise_screen_styles.topText}>{exercise.name}</Text>
          <View style={exercise_screen_styles.imageContainer}>
            {exercise.gifUrl && (
              <Image
                style={exercise_screen_styles.exerciseGifResult}
                source={{ uri: exercise.gifUrl }}
              />
            )}
          </View>
          <BottomText str={"Equipment: " + exercise.equipment} />
          <BottomText str={"Body Part: " + exercise.bodyPart} />
          <BottomText str={"Target: " + exercise.target} />
          <BottomText
            str={"Secondary Muscles: " + exercise.secondaryMuscles.join(", ")}
          />
          <Text style={exercise_screen_styles.topText}></Text>
          <Text style={exercise_screen_styles.topText}>Instructions:</Text>
          {exercise.instructions.map((instruction, index) => (
            <Text key={index} style={exercise_screen_styles.bottomText}>
              {instruction}
            </Text>
          ))}
          <Button
            onPress={() => {
              setModalVisible(true);
            }}
            color={Colors.blue}
          >
            Add To Workout Plan
          </Button>
          <WorkoutPlansModalScreen
            isVisible={modalVisible}
            onClose={() => {
              setModalVisible(false);
            }}
            exerciseId={exercise._id}
          />
        </View>
      </View>
    </View>
  );
};

export default ExerciseDetailsScreen;
