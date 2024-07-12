import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { search_exercises_styles } from "@/assets/styles/exercises";
import WorkoutPlansModalScreen from "@/assets/components/modals/workoutPlan";
import { useState } from "react";
import { Colors } from "@/assets/styles/common";

const ExerciseDetailsScreen = () => {
  const { exerciseJSON } = useLocalSearchParams<{ exerciseJSON: string }>();
  if (!exerciseJSON) {
    return <Text>Exercise not found</Text>;
  }
  const exercise = JSON.parse(exerciseJSON) as Exercise;

  const [modalVisible, setModalVisible] = useState(false);


  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <View style={search_exercises_styles.exerciseDetailsContainer}>
          <Text style={search_exercises_styles.title}>{exercise.name}</Text>
          <Text style={search_exercises_styles.title}></Text>
          <View style={search_exercises_styles.exerciseDetailsImageAndTextContainer}>
            <View style={search_exercises_styles.exerciseDetailsTextContainer}>
              <View style={search_exercises_styles.exerciseDetailsHorizontalTextContainer}>
                <View style={search_exercises_styles.exerciseDetailsPropertyTextContainer}>
                  <Text style={search_exercises_styles.exerciseDetailsPropertyTextBold}>Body Part</Text>
                  <Text style={search_exercises_styles.exerciseDetailsPropertyText}>{exercise.bodyPart}</Text>
                </View>
                <View style={search_exercises_styles.exerciseDetailsPropertyTextContainer}>
                  <Text style={search_exercises_styles.exerciseDetailsPropertyTextBold}>Target</Text>
                  <Text style={search_exercises_styles.exerciseDetailsPropertyText}>{exercise.target}</Text>
                </View>
                <View style={search_exercises_styles.exerciseDetailsPropertyTextContainer}>
                  <Text style={search_exercises_styles.exerciseDetailsPropertyTextBold}>Equipment</Text>
                  <Text style={search_exercises_styles.exerciseDetailsPropertyText}>{exercise.equipment}</Text>
                </View>  
              </View>
                <Text style={search_exercises_styles.exerciseDetailsPropertyTextBold}>Secondary Muscles</Text>
                <Text style={search_exercises_styles.exerciseDetailsPropertyText}>{exercise.secondaryMuscles.join(", ")}</Text>      
              </View>
          </View>
          <View style={{ marginTop: 20, marginBottom: 20 }}>
            {exercise.gifUrl && (
                <Image
                  style={search_exercises_styles.exerciseDetailsGifResult}
                  source={{ uri: exercise.gifUrl }}
                />
            )}
          </View>
          <Text style={search_exercises_styles.topText}>Instructions</Text>
          <View style={{ borderRadius: 10, borderColor: Colors.white, borderWidth: 0.2, padding: 20 }}>
            {exercise.instructions.map((instruction, index) => (
              <Text key={index} style={search_exercises_styles.bottomText}>
                {instruction}
              </Text>
            ))}
          </View>
          <Text style={search_exercises_styles.topText}></Text>
        </View>  
      </ScrollView>
      <TouchableOpacity
        style={search_exercises_styles.workoutPlanfloatingButton}
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <Text style={search_exercises_styles.workoutPlanfloatingButtonText}>
          +
        </Text>
      </TouchableOpacity>
      <WorkoutPlansModalScreen
        isVisible={modalVisible}
        onClose={() => {
          setModalVisible(false);
        }}
        exerciseId={exercise._id}
      />
    </View> 
  );
};

export default ExerciseDetailsScreen;
