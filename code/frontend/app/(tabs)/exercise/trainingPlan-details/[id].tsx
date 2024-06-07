import { FlatList, Image, Pressable, StyleSheet } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { Exercise, ExercisesFromWorkoutPlanResponse, TrainingPlan, TrainingPlanResponse } from "@/domain/types";
import { Link, useLocalSearchParams } from "expo-router";
import { Stack } from "expo-router";
import { Button, color } from "@rneui/base";
import { router } from "expo-router";
import search_exercises_styles from "@/assets/styles/exercises";
import { useEffect, useState } from "react";
import { Colors, localhost } from "@/constants";
import { getLocalUser } from "@/assets/functions/auth";

const BottomText = ({ str }: { str: string | null }) => (
    <>{str && <Text style={search_exercises_styles.bottomText}>{str}</Text>}</>
);

const removeParenthesesFromExerciseName = (exercise: Exercise) => {
    if (exercise.name.endsWith(")")) {
        exercise.name = exercise.name.slice(0, exercise.name.lastIndexOf("("));
    }
    return exercise;
}

const handleExercisePress = async (exercise: Exercise) => {
    router.push({
        pathname: `/exercise/exercise-details/${exercise._id}`,
        params: { exerciseJSON: JSON.stringify(exercise) }
    });
}

const TrainingPlanDetailsScreen = () => {
    const { trainingPlanJSON } = useLocalSearchParams<{ trainingPlanJSON: string }>();
    const trainingPlan = JSON.parse(trainingPlanJSON) as TrainingPlan;
    const [exercises, setExercises] = useState<Exercise[]>([]);
    const [token, setToken] = useState<string>("");
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const fetchExercises = async () => {
            
            try {
                const user = await getLocalUser();

                /*if (user === null) {
                    return;
                }

                if (user.token === undefined) {
                    return;
                }
                    
                setToken(user.token)*/

                setToken("147f3bb2-0791-41c2-8805-8dc660d9a157");

                const response = await fetch(`${localhost}8080/api/exercises/workoutPlans/${trainingPlan.name}`,
                    {
                        method: 'GET',
                        headers: {
                          'Authorization': `Bearer 147f3bb2-0791-41c2-8805-8dc660d9a157`,
                          'Content-Type': 'application/json',
                        },
                    }
                );

                if (response.status !== 200) {
                    alert(`Failed to fetch exercises of ${trainingPlan.name}`);
                }

                const exercisesResult: ExercisesFromWorkoutPlanResponse = await response.json();
                let modifiedExercises: Exercise[] = [];
                for (let exerciseResult of exercisesResult.obj) {
                    modifiedExercises.push(removeParenthesesFromExerciseName(exerciseResult));
                }

                setExercises(modifiedExercises);
            } catch (error) {
                console.error(`Error fetching exercises of ${trainingPlan.name}:`, error);
            }

            setLoaded(true);
        }

        fetchExercises();
    }, []);

    const ExerciseResult: React.FC<Exercise> = ({ _id, name, gifUrl, equipment }) => {
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
                <Button color={"error"} onPress={() => {handleDeletePress(trainingPlan.name, _id, token)}}>Delete</Button>
            </View>
        );
    }

    const handleDeletePress = async (trainingPlanName:string, exerciseId: string, token: string) => {
        const response = await fetch(`${localhost}8080/api/exercises/workoutPLans/${trainingPlanName}/exercise/${exerciseId}`,
            {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            }
        )
    
        if (response.status !== 200) {
            const errorMessage: TrainingPlanResponse = await response.json()
            alert(errorMessage.message);
            return;
        }
    
        exercises.splice(exercises.findIndex(exercise => exercise._id === exerciseId), 1);
        setExercises([...exercises]);
        alert("Exercise deleted successfully");
    }

    return (
        <View>
            <Stack.Screen options={{ title: "Details" }}/>
            <View style={search_exercises_styles.exerciseResultContainer}>
                {loaded ? 
                    <View style={search_exercises_styles.exerciseResultTextContainer}>
                        <Text style={search_exercises_styles.topText}>{trainingPlan.name}</Text>
                        <Text style={search_exercises_styles.topText}/>
                        <BottomText str={'Description: ' + trainingPlan.description} />
                        <Text style={search_exercises_styles.topText}></Text>
                        <Text style={search_exercises_styles.topText}>Exercises:</Text>
                        <FlatList
                            data={exercises}
                            renderItem={({ item }) => 
                                <Pressable onPress={() => {handleExercisePress(item)}}>
                                    <ExerciseResult {...item} />
                                </Pressable>
                            }
                            keyExtractor={(item: Exercise) => item._id}
                        />
                    </View> : 
                    <View style={search_exercises_styles.exerciseResultTextContainer}>
                        <Text style={search_exercises_styles.topText}>Loading...</Text>
                    </View>
                }
            </View>
        </View>
    );
}

export default TrainingPlanDetailsScreen;
