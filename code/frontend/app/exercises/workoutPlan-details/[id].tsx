import { Alert, FlatList, Image, Pressable, Text, TouchableOpacity, View } from "react-native";

import { useLocalSearchParams, Stack, router } from "expo-router";
import { Button, color } from "@rneui/base";
import search_exercises_styles from "@/assets/styles/exercises";
import { useContext, useEffect, useState } from "react";
import { localhost } from "@/constants";
import { UserContext } from "@/assets/components/auth/AuthContext";
import { getLocalUser } from '@/services/auth';

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

const WorkoutPlanDetailsScreen = () => {
    const { workoutPlanJSON: workoutPlanJSON } = useLocalSearchParams<{ workoutPlanJSON: string }>();
    if(!workoutPlanJSON) {
        return <Text>Workout plan not found</Text>
    }
    const workoutPlan = JSON.parse(workoutPlanJSON) as WorkoutPlan;
    const [exercises, setExercises] = useState<Exercise[]>([]);
    const [token, setToken] = useState<string>("");
    const [loaded, setLoaded] = useState(false);
    const [log, setLog] = useState(false);

    useEffect(() => {
        const fetchExercises = async () => {
            
            try {
                const user = await getLocalUser();
                if (!user) {
                    router.push(`/auth/login/`);
                    return;
                }
                setToken(user.token);

                const response = await fetch(`${localhost}/api/exercises/workoutPlans/${workoutPlan.name}`,
                    {
                        method: 'GET',
                        headers: {
                          'Authorization': `Bearer ${user.token}`,
                          'Content-Type': 'application/json',
                        },
                    }
                );

                if (response.status !== 200) {
                    alert(`Failed to fetch exercises of ${workoutPlan.name}`);
                }

                const exercisesResult: ExercisesFromWorkoutPlanResponse = await response.json();
                let modifiedExercises: Exercise[] = [];
                for (let exerciseResult of exercisesResult.obj) {
                    modifiedExercises.push(removeParenthesesFromExerciseName(exerciseResult));
                }

                setExercises(modifiedExercises);
            } catch (error) {
                console.error(`Error fetching exercises of ${workoutPlan.name}:`, error);
            }

            setLoaded(true);
        }

        fetchExercises();
    }, []);

    useEffect(() => {
        const saveWorkoutPlan = async () => {
            try {
                const response = await fetch(`${localhost}/api/exercises/workoutPlans/log`, 
                    {
                        method: 'POST',
                        headers: {
                          'Authorization': `Bearer ${token}`,
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ workoutPlanName: workoutPlan.name })
                      }
                )
                
                if (response.status !== 200) {
                    const errorMessage: WorkoutPlanResponse = await response.json()
                    alert(errorMessage.message);
                    return;
                }
                
                alert("Workout plan saved successfully");
            } catch (error) {
                console.error(`Error saving workout plan ${workoutPlan.name}:`, error);
            }
        }
        if (log) {
            saveWorkoutPlan();
            setLog(false);
        }
    }, [log]);

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
                <Button color={"error"} onPress={() => {handleDeletePress(workoutPlan.name, _id, token)}}>Delete</Button>
            </View>
        );
    }

    const handleDeletePress = async (workoutPlanName:string, exerciseId: string, token: string) => {
        try {
            Alert.alert("Delete Exercise", "Are you sure you want to delete this exercise?", [
                {
                    text: "Yes",
                    onPress: async () => { 
                        const response = await fetch(`${localhost}/api/exercises/workoutPLans/${workoutPlanName}/exercise/${exerciseId}`,
                            {
                                method: 'DELETE',
                                headers: {
                                    'Authorization': `Bearer ${token}`,
                                    'Content-Type': 'application/json',
                                }
                            }
                        )
                        
                        if (response.status !== 200) {
                            const errorMessage: WorkoutPlanResponse = await response.json()
                            alert(errorMessage.message);
                            return;
                        }
                        
                        exercises.splice(exercises.findIndex(exercise => exercise._id === exerciseId), 1);
                        setExercises([...exercises]);
                     },
                },
                {
                    text: "No",
                    onPress: () => { return },
                },
            ]);
        } catch (error) {
            console.error(`Error deleting exercise ${exerciseId} from ${workoutPlanName}:`, error);
        }
    }

    return (
        <View>
            <Stack.Screen options={{ title: "Details" }}/>
            <View style={search_exercises_styles.exerciseResultContainer}>
                {loaded ? 
                    <View style={search_exercises_styles.exerciseResultTextContainer}>
                        <Text style={search_exercises_styles.topText}>{workoutPlan.name}</Text>
                        <Text style={search_exercises_styles.topText}/>
                        <BottomText str={'Description: ' + workoutPlan.description} />
                        <Text style={search_exercises_styles.topText}></Text>
                        <Text style={search_exercises_styles.topText}>Exercises:</Text>
                        {exercises.length === 0 && <Text style={search_exercises_styles.bottomText}>No exercises added yet</Text>}
                        <FlatList
                            data={exercises}
                            renderItem={({ item }) => 
                                <Pressable onPress={() => {handleExercisePress(item)}}>
                                    <ExerciseResult {...item} />
                                </Pressable>
                            }
                            keyExtractor={(item: Exercise) => item._id}
                            contentContainerStyle={{ paddingBottom: 40 }}
                        />
                        <TouchableOpacity style={search_exercises_styles.floatingButton} onPress={ () => { setLog(true) }}>
                            <Image
                              source={require("@/assets/images/save.png")}
                              style={{ marginRight: 0 }}
                            />
                        </TouchableOpacity>
                    </View> : 
                    <View style={search_exercises_styles.exerciseResultTextContainer}>
                        <Text style={search_exercises_styles.topText}>Loading...</Text>
                    </View>
                }
            </View>
        </View>
    );
}

export default WorkoutPlanDetailsScreen;
