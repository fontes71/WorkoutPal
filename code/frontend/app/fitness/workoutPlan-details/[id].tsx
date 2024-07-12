import {
  Alert,
  FlatList,
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import search_exercises_styles from "@/assets/styles/exercises";
import { useContext, useEffect, useState } from "react";
import {  localhost } from "@/assets/constants";
import { UserContext } from "@/assets/components/auth/AuthContext";
import { removeParenthesesFromExerciseNameAndCapitalizeFirstLetter } from "@/assets/components/exercises/removeParenthesesFromExerciseName";
import NoBottomCutView from "@/assets/components/common/NoBottomCutView";
import { Colors } from "@/assets/styles/common";

const WorkoutPlanDetailsScreen = () => {
  const { workoutPlanJSON: workoutPlanJSON } = useLocalSearchParams<{
    workoutPlanJSON: string;
  }>();
  if (!workoutPlanJSON) {
    return <Text>Workout plan not found</Text>;
  }
  const workoutPlan = JSON.parse(workoutPlanJSON) as WorkoutPlan;
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [token, setToken] = useState<string>("");
  const [loaded, setLoaded] = useState(false);
  const [log, setLog] = useState(false);
  const { userContext } = useContext(UserContext);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        if (!userContext) {
          router.push(`/auth/login/`);
          return;
        }
        setToken(userContext.token);

        const response = await fetch(
          `${localhost}/api/exercises/workoutPlans/${workoutPlan.name}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${userContext.token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status !== 200) {
          alert(`Failed to fetch exercises of ${workoutPlan.name}`);
        }

        const exercisesResult: ExercisesFromWorkoutPlanResponse =
          await response.json();
        let modifiedExercises: Exercise[] = [];
        for (let exerciseResult of exercisesResult.obj) {
          modifiedExercises.push(
            removeParenthesesFromExerciseNameAndCapitalizeFirstLetter(exerciseResult)
          );
        }

        setExercises(modifiedExercises);
      } catch (error) {
        console.error(
          `Error fetching exercises of ${workoutPlan.name}:`,
          error
        );
      }

      setLoaded(true);
    };

    fetchExercises();
  }, []);

  useEffect(() => {
    const saveWorkoutPlan = async () => {
      try {
        const response = await fetch(
          `${localhost}/api/exercises/workoutPlans/log`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ workoutPlanName: workoutPlan.name }),
          }
        );

        if (response.status !== 200) {
          const errorMessage: WorkoutPlanResponse = await response.json();
          alert(errorMessage.message);
          return;
        }

        alert("Workout plan saved successfully");
      } catch (error) {
        console.error(`Error saving workout plan ${workoutPlan.name}:`, error);
      }
    };
    if (log) {
      saveWorkoutPlan();
      setLog(false);
    }
  }, [log]);

  const handleExercisePress = async (exercise: Exercise) => {
    router.push({
      pathname: `/fitness/exercise-details/${exercise._id}`,
      params: { exerciseJSON: JSON.stringify(exercise) },
    });
  };

  const ExerciseResult: React.FC<Exercise> = ({
    _id,
    name,
    gifUrl,
    target,
  }) => {
    return (
      <View style={{alignItems: "center", paddingHorizontal: 10}}>
        <View style={{ backgroundColor: Colors.lightBlack, height: 70, marginTop: 20, width: "100%", flexDirection: "row", borderRadius: 10, justifyContent: "center" }}>
          <View style={{ width: "100%", height: "100%", alignItems: "center", flexDirection: "row" }}>
            <View style={{ width: "17%", paddingLeft: "10%", paddingRight: "20%"}}>
              {gifUrl && (
                <Image
                  style={{ width: 50, height: 50 }}
                  source={{ uri: gifUrl }}
                />
              )}
            </View>
            <View style={{flexDirection: "column", alignItems: "center", width: "63%", justifyContent: "center"}}>
              <Text style={{ fontSize: 14, color: Colors.white, fontWeight: "bold" }}>{name}</Text>
              <Text style={{ fontSize: 14, color: Colors.white }}>{target}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const handleDeletePress = async (
    workoutPlanName: string,
    exerciseId: string,
    token: string
  ) => {
    try {
      Alert.alert(
        "Delete Exercise",
        "Are you sure you want to delete this exercise?",
        [
          {
            text: "Yes",
            onPress: async () => {
              const response = await fetch(
                `${localhost}/api/exercises/workoutPlans/${workoutPlanName}/exercise/${exerciseId}`,
                {
                  method: "DELETE",
                  headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                  },
                }
              );

              if (response.status !== 200) {
                const errorMessage: WorkoutPlanResponse = await response.json();
                alert(errorMessage.message);
                return;
              }

              exercises.splice(
                exercises.findIndex((exercise) => exercise._id === exerciseId),
                1
              );
              setExercises([...exercises]);
            },
          },
          {
            text: "No",
            onPress: () => {
              return;
            },
          },
        ]
      );
    } catch (error) {
      console.error(
        `Error deleting exercise ${exerciseId} from ${workoutPlanName}:`,
        error
      );
    }
  };

  return (
    <NoBottomCutView marginBottom={10}>
      <View style={{ flex: 1 }}>
        <View style={search_exercises_styles.workoutPlansResultContainer}>
          {loaded ? (
            <View style={search_exercises_styles.workoutPlanResultTextContainer}>
              <Text style={search_exercises_styles.title}>
                {workoutPlan.name}
              </Text>
              <Text style={search_exercises_styles.bottomText}>{"  " + workoutPlan.description}</Text>
              <Text style={search_exercises_styles.topText}></Text>
              <Text style={search_exercises_styles.topText}></Text>
              <Text style={search_exercises_styles.topText}>Exercises</Text>
              <View style={search_exercises_styles.workoutPlansContainer}>
                {exercises.length === 0 && (
                  <View style={{ alignItems: 'center', padding: 20 }}>
                    <Text style={search_exercises_styles.bottomText}>
                      No exercises added yet
                    </Text>
                  </View>
                )}
                <FlatList
                  data={exercises}
                  renderItem={({ item }) => (
                    <Pressable
                      onPress={() => {
                        handleExercisePress(item);
                      }}
                      onLongPress={() => {
                        handleDeletePress(workoutPlan.name, item._id, token);
                      }}
                    >
                      <ExerciseResult {...item} />
                    </Pressable>
                  )}
                  keyExtractor={(item: Exercise) => item._id}
                  contentContainerStyle={{ paddingBottom: 40 }}
                  onEndReachedThreshold={0.4}
                />
              </View>
            </View>
          ) : (
            <View style={search_exercises_styles.exerciseResultTextContainer}>
              <Text style={search_exercises_styles.topText}>Loading...</Text>
            </View>
          )}
        </View>
      </View>
      <View>
        {loaded ? (
          <TouchableOpacity
            style={search_exercises_styles.floatingButton}
            onPress={() => {
              setLog(true);
            }}
          >
            <Image
              source={require("@/assets/images/save_white.png")}
              style={{ marginRight: 0 }}
            />
          </TouchableOpacity>
        ) : (
          <Text style={search_exercises_styles.topText}></Text>
        )}
      </View>
    </NoBottomCutView>
  );
};

export default WorkoutPlanDetailsScreen;
