import {
  Alert,
  FlatList,
  Pressable,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import { Text, View } from "react-native";
import { Stack, router } from "expo-router";
import { useState, useEffect, useContext } from "react";
import { Colors, localhost } from "@/assets/constants";
import search_exercises_styles from "@/assets/styles/exercises";
import CreateWorkoutPlansModalScreen from "@/assets/components/modals/createWorkoutPlan";
import { UserContext } from "@/assets/components/auth/AuthContext";
import NoBottomCutView from "@/assets/components/food/common/NoBottomCutView";
import workoutPlans_styles from "@/assets/styles/workoutPlans";
import { BottomText } from "@/assets/components/exercises/bottomText";
import { Button } from "@rneui/base";

export default function WorkoutPlansScreen() {
  const [workoutPlans, setWorkoutPlans] = useState<WorkoutPlan[]>([]);
  const [token, setToken] = useState<string>("");
  const [modalVisible, setModalVisible] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const { userContext } = useContext(UserContext);

  useEffect(() => {
    const fetchWorkoutPlans = async () => {
      if (!userContext) {
        router.push(`/auth/login/`);
        return;
      }
      setToken(userContext.token);

      const response = await fetch(`${localhost}/api/exercises/workoutPlans`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${userContext.token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status !== 200) {
        const errorMessage = await response.json();
        alert(errorMessage.message);
        return;
      }

      const workoutPlans: WorkoutPlanResponse = await response.json();
      setWorkoutPlans(workoutPlans.obj);
      setLoaded(true);
    };

    fetchWorkoutPlans();
  }, []);

  const handleReload = async (token: string) => {
    const response = await fetch(`${localhost}/api/exercises/workoutPlans`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.status !== 200) {
      return;
    }

    const workoutPlans: WorkoutPlanResponse = await response.json();
    setWorkoutPlans(workoutPlans.obj);
  };

  useEffect(() => {
    if (modalVisible == false) {
      handleReload(token);
    }
  }, [modalVisible]);

  const handleWorkoutPlanPress = (workoutPlan: WorkoutPlan) => {
    router.push({
      pathname: `/fitness/workoutPlan-details/${workoutPlan.name}`,
      params: { workoutPlanJSON: JSON.stringify(workoutPlan) },
    });
  };

  const WorkoutPlanResult: React.FC<any> = ({ name, description }) => {
    return (
      <View style={workoutPlans_styles.workoutPlansResultContainer}>
        <View style={workoutPlans_styles.workoutPlansResultTextContainer}>
          <Text style={workoutPlans_styles.topText}>{name}</Text>
          <BottomText str={"Description: " + description} />
          <Button
            color={"error"}
            onPress={() => {
              handleDeletePress(name, token);
            }}
            style={{ marginTop: 5 }}
          >
            Delete
          </Button>
        </View>
      </View>
    );
  };

  const handleDeletePress = async (workoutPlanName: string, token: string) => {
    try {
      Alert.alert(
        "Delete Workout Plan",
        "Are you sure you want to delete this workout plan?",
        [
          {
            text: "Yes",
            onPress: async () => {
              const response = await fetch(
                `${localhost}/api/exercises/workoutPlans/${workoutPlanName}`,
                {
                  method: "DELETE",
                  headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                  },
                }
              );

              if (response.status !== 200) {
                const errorMessage: RemmoveWorkoutPlanResposne =
                  await response.json();
                alert(errorMessage.message);
                return;
              }

              workoutPlans.splice(
                workoutPlans.findIndex(
                  (workoutPlan) => workoutPlan.name === workoutPlanName
                ),
                1
              );
              setWorkoutPlans([...workoutPlans]);
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
      console.error(`Error deleting workout plan ${workoutPlanName}:`, error);
    }
  };

  return (
    <NoBottomCutView marginBottom={5}>
      <View style={{ flex: 1 }}>
        <Stack.Screen options={{ title: "Workout Plans" }} />
        <View style={search_exercises_styles.workoutPlansResultContainer}>
          {loaded ? (
            <View>
              <FlatList
                data={workoutPlans}
                renderItem={({ item }) => (
                  <Pressable
                    onPress={() => {
                      handleWorkoutPlanPress(item);
                    }}
                  >
                    <WorkoutPlanResult {...item} />
                  </Pressable>
                )}
                keyExtractor={(item: WorkoutPlan) => item.name}
                contentContainerStyle={{ paddingBottom: 40 }}
                refreshControl={
                  <RefreshControl
                    refreshing={false}
                    onRefresh={() => handleReload(token)}
                  />
                }
              />
            </View>
          ) : (
            <View style={search_exercises_styles.exerciseResultContainer}>
              <Text style={search_exercises_styles.topText}>
                Loading your workout plans...
              </Text>
            </View>
          )}
        </View>
        <View>
          {loaded ? (
            <View>
              <TouchableOpacity
                style={search_exercises_styles.floatingButton}
                onPress={() => {
                  setModalVisible(true);
                }}
              >
                <Text style={search_exercises_styles.floatingButtonText}>
                  +
                </Text>
              </TouchableOpacity>
              <CreateWorkoutPlansModalScreen
                isVisible={modalVisible}
                onClose={() => {
                  setModalVisible(false);
                }}
              />
            </View>
          ) : (
            <Text style={search_exercises_styles.topText}></Text>
          )}
        </View>
      </View>
    </NoBottomCutView>
  );
}
