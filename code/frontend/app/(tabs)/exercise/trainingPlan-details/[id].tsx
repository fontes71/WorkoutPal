import { FlatList, Image, Pressable, StyleSheet } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { Exercise, TrainingPlan } from "@/domain/types";
import { Link, useLocalSearchParams } from "expo-router";
import { Stack } from "expo-router";
import { Button } from "@rneui/base";
import { router } from "expo-router";
import search_exercises_styles from "@/assets/styles/exercises";
import { useEffect, useState } from "react";
import { localhost } from "@/constants";

const BottomText = ({ str }: { str: string | null }) => (
    <>{str && <Text style={search_exercises_styles.bottomText}>{str}</Text>}</>
);

const removeParenthesesFromExerciseName = (exercise: Exercise) => {
    if (exercise.name.endsWith(")")) {
        exercise.name = exercise.name.slice(0, exercise.name.lastIndexOf("("));
    }
    return exercise;
}

const ExerciseResult: React.FC<Exercise> = ({ name, gifUrl, equipment }) => {
    return (
        <View>
            <View style={search_exercises_styles.imageContainer}>
                {gifUrl && (
                    <Image
                        style={search_exercises_styles.exerciseGifResult}
                        source={{uri: gifUrl}}
                    />
                )}
            </View>
            <View style={search_exercises_styles.exerciseResultTextContainer}>
                <Text style={search_exercises_styles.bottomText}>{name}</Text>
                <BottomText str={'Equipment: ' + equipment} />
            </View>
        </View>
    );
}

const TrainingPlanDetailsScreen = () => {
    const { trainingPlanJSON } = useLocalSearchParams<{ trainingPlanJSON: string }>();
    const trainingPlan = JSON.parse(trainingPlanJSON) as TrainingPlan;
    const [exercises, setExercises] = useState<Exercise[]>([]);

    useEffect(() => {
        const fetchExercises = async () => {
            // Define the delay between requests (in milliseconds)
            const delay = 300; // 3 thents delay
            
            for (let i = 0; i < trainingPlan.exercises.length; i++) {
                const exerciseId = trainingPlan.exercises[i];

                if (exercises.find(e => e._id === exerciseId)) {
                    console.log('Exercise already fetched');
                    continue; // Skip fetching if exercise is already fetched
                }

                // Use setTimeout to wait before making the next request
                await new Promise(resolve => setTimeout(resolve, delay));

                try {
                    const response = await fetch(`${localhost}8080/api/exercise/${exerciseId}`);

                    if (response.status !== 200) {
                        console.error(`Failed to fetch exercise with ID ${exerciseId}`);
                        continue; // Skip to the next exercise if request fails
                    }

                    const exerciseResult = await response.json();
                    const modifiedExercise = removeParenthesesFromExerciseName(exerciseResult);

                    setExercises(prevExercises => [...prevExercises, modifiedExercise]);
                } catch (error) {
                    console.error(`Error fetching exercise with ID ${exerciseId}:`, error);
                }
            }
        }

        fetchExercises();
    }, []);

    return (
        <View>
            <Stack.Screen options={{ title: "Details" }}/>
            <View style={search_exercises_styles.exerciseResultContainer}>
                {exercises.length !== 0 ? 
                    <View style={search_exercises_styles.exerciseResultTextContainer}>
                        <Text style={search_exercises_styles.topText}>{trainingPlan.name}</Text>
                        <Text style={search_exercises_styles.topText}/>
                        <BottomText str={'Description: ' + trainingPlan.description} />
                        <Text style={search_exercises_styles.topText}></Text>
                        <Text style={search_exercises_styles.topText}>Exercises:</Text>
                        <FlatList
                            data={exercises}
                            renderItem={({ item }) => 
                                <ExerciseResult {...item} />
                            }
                            keyExtractor={(item: Exercise) => item._id}
                        />
                    </View> : <Text>Loading...</Text>
                }
            </View>
        </View>
    );
}

export default TrainingPlanDetailsScreen;
