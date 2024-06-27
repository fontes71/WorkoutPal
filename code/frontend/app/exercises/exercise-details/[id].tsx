import { Image, Text, View } from "react-native";
import { useLocalSearchParams, Stack, router } from "expo-router";
import { Button } from "@rneui/base";
import search_exercises_styles from "@/assets/styles/exercises";
import WorkoutPlansModalScreen from "@modals/workoutPlan";
import { useState } from "react";
import { BottomText } from "@/assets/components/exercises/bottomText";

const ExerciseDetailsScreen = () => {
    const { exerciseJSON } = useLocalSearchParams<{ exerciseJSON: string }>();
    if (!exerciseJSON) {
        return <Text>Exercise not found</Text>;
    }
    const exercise = JSON.parse(exerciseJSON) as Exercise;

    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View>
            <Stack.Screen options={{ title: "Details" }}/>
            <View style={search_exercises_styles.exerciseResultContainer}>
                <View style={search_exercises_styles.exerciseResultTextContainer}>
                    <Text style={search_exercises_styles.topText}>{exercise.name}</Text>
                    <View style={search_exercises_styles.imageContainer}>
                    {exercise.gifUrl && (
                        <Image
                            style={search_exercises_styles.exerciseGifResult}
                            source={{uri: exercise.gifUrl}}
                        />
                    )}
                </View>
                    <BottomText str={'Equipment: ' + exercise.equipment} />
                    <BottomText str={'Body Part: ' + exercise.bodyPart} />
                    <BottomText str={'Target: ' + exercise.target} />
                    <BottomText str={'Secondary Muscles: ' + exercise.secondaryMuscles.join(', ')} />
                    <Text style={search_exercises_styles.topText}></Text>
                    <Text style={search_exercises_styles.topText}>Instructions:</Text>
                    {exercise.instructions.map((instruction, index) => (
                        <Text key={index} style={search_exercises_styles.bottomText}>{instruction}</Text>
                    ))}
                    <Button onPress={() => {setModalVisible(true)}}>Add To Workout Plan</Button>
                    <WorkoutPlansModalScreen isVisible={modalVisible} onClose={() => {setModalVisible(false)}} exerciseId={exercise._id}/>
                </View>
            </View>
        </View>
    );
}

export default ExerciseDetailsScreen;