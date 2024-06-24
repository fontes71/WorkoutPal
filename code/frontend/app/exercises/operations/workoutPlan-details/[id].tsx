import { FlatList, Image, Pressable, Text, View } from "react-native";

import { useLocalSearchParams, Stack, router } from "expo-router";
import { Button, color } from "@rneui/base";
import search_exercises_styles from "@/assets/styles/exercises";
import { useContext, useEffect, useState } from "react";
import { localhost } from "@/constants";
import { UserContext } from "@/assets/components/auth/AuthContext";
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
        pathname: `/exercise/operations/exercise-details/${exercise._id}`,
        params: { exerciseJSON: JSON.stringify(exercise) }
    });
}

interface TopSectionProps {
    workoutPlan: WorkoutPlan;
  }
  
  const TopSection: React.FC<TopSectionProps> = ({ workoutPlan: workoutPlan }) => {
    const { userContext } = useContext(UserContext)
    const onSaveHook = async (workoutPlan: WorkoutPlan) => {
        if (!userContext && userContext === null) {
          router.push(`/auth/login/`);
          return;
        }
        const response = await fetch(`${localhost}8080/api/exercises/workoutPlans/log`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${userContext.token}`,
          },
          body: JSON.stringify({ workoutPlanName: workoutPlan.name}),
        });

        if (response.status !== 200) {
            alert("Failed to save workout plan");
            return;
        }
  
        router.push(`/exercise/`);
    };
  
    return (
      <Stack.Screen
        options={{
          headerTitle: "Log Workout Plan",
          headerRight: () => (
            <Pressable onPress={() => onSaveHook(workoutPlan)}>
              <Image
                source={require("@/assets/images/save.png")}
                style={{ marginRight: 0 }}
              />
            </Pressable>
          ),
          headerTitleAlign: "left",
        }}
      />
    );
  };

const WorkoutPlanDetailsScreen = () => {
    const { workoutPlanJSON: workoutPlanJSON } = useLocalSearchParams<{ workoutPlanJSON: string }>();
    if(!workoutPlanJSON) {
        return <Text>Workout plan not found</Text>
    }
    const workoutPlan = JSON.parse(workoutPlanJSON) as WorkoutPlan;
    const [exercises, setExercises] = useState<Exercise[]>([]);
    const [token, setToken] = useState<string>("");
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const fetchExercises = async () => {
            
            try {
                const user = await getLocalUser();
                setToken(user.token);

                const response = await fetch(`${localhost}8080/api/exercises/workoutPlans/${workoutPlan.name}`,
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
        const response = await fetch(`${localhost}8080/api/exercises/workoutPLans/${workoutPlanName}/exercise/${exerciseId}`,
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
        alert("Exercise deleted successfully");
    }

    return (
        <View>
            <Stack.Screen options={{ title: "Details" }}/>
            <View style={search_exercises_styles.exerciseResultContainer}>
                {loaded ? 
                    <View style={search_exercises_styles.exerciseResultTextContainer}>
                        <TopSection workoutPlan={workoutPlan}/>
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

export default WorkoutPlanDetailsScreen;
