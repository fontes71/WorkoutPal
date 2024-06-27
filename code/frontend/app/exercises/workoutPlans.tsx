import { FlatList, Pressable, RefreshControl, TouchableOpacity  } from "react-native";

import { Text, View } from "react-native";
import { Stack, router } from "expo-router";
import { useState, useEffect, useContext } from "react";
import { localhost } from "@/constants";
import search_exercises_styles from "@/assets/styles/exercises";
import CreateWorkoutPlansModalScreen from "@/app/modals/createWorkoutPlan";
import { UserContext } from "@/assets/components/auth/AuthContext";

const BottomText = ({ str }: { str: string | null }) => (
    <>{str && <Text style={search_exercises_styles.bottomText}>{str}</Text>}</>
);

const WorkoutPlanResult: React.FC<WorkoutPlan> = ({ name, description }) => {
    return (
        <View style={search_exercises_styles.workoutPlansResultContainer}>
          <View style={search_exercises_styles.exerciseResultTextContainer}>
            <Text style={search_exercises_styles.topText}>{name}</Text>
            <BottomText str={'Description: ' + description} />
          </View>
        </View>
    );
}

const handleWorkoutPlanPress = (workoutPlan: WorkoutPlan) => {
    router.push({
        pathname: `/exercises/workoutPlan-details/${workoutPlan.name}`,
        params: { workoutPlanJSON: JSON.stringify(workoutPlan) }
    });
}

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
           
            const response = await fetch(`${localhost}/api/exercises/workoutPlans`, 
                {
                    method: 'GET',
                    headers: {
                      'Authorization': `Bearer ${userContext.token}`,
                      'Content-Type': 'application/json',
                    },
                }
            );

            if (response.status !== 200) {
                const errorMessage = await response.json();
                alert(errorMessage.message);
                return;
            }

            const workoutPlans: WorkoutPlanResponse = await response.json();
            setWorkoutPlans(workoutPlans.obj);
            setLoaded(true);
        }

        fetchWorkoutPlans();
    }, []);

    const handleReload = async (token: string) => {
        const response = await fetch(`${localhost}/api/exercises/workoutPlans`, 
            {
                method: 'GET',
                headers: {
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json',
                },
            }
        );
    
        if (response.status !== 200) {
            return;
        }
    
        const workoutPlans: WorkoutPlanResponse = await response.json();
        setWorkoutPlans(workoutPlans.obj);
    }

    useEffect(() => {
        if (modalVisible == false) {
            handleReload(token);
        }
    }, [modalVisible]);

    return (
        <View>
            <Stack.Screen options={{ title: "Workout Plans" }}/>
            <View style={search_exercises_styles.workoutPlansResultContainer}>
                { loaded ?
                    <View>
                        <FlatList
                            data={workoutPlans}
                            renderItem={({ item }) => 
                                <Pressable onPress={() => {handleWorkoutPlanPress(item)}}>
                                    <WorkoutPlanResult {...item} />
                                </Pressable>
                            }
                            keyExtractor={(item: WorkoutPlan) => item.name}
                            contentContainerStyle={{ paddingBottom: 40 }}
                            refreshControl={
                                <RefreshControl
                                    refreshing={false}
                                    onRefresh={() => handleReload(token)}
                                />
                            }
                        /> 
                        <TouchableOpacity style={search_exercises_styles.floatingButton} onPress={() => { setModalVisible(true) }}>
                            <Text style={search_exercises_styles.floatingButtonText}>+</Text>
                        </TouchableOpacity>
                        <CreateWorkoutPlansModalScreen isVisible={modalVisible} onClose={() => {setModalVisible(false)}}/>
                    </View> : 
                    <View style={search_exercises_styles.exerciseResultContainer}>
                        <Text style={search_exercises_styles.topText}>Loading your workout plans...</Text>
                    </View>
                }
            </View>
        </View>
    );
}