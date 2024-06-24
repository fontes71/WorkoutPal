import { FlatList, Pressable, RefreshControl  } from "react-native";

import { Text, View } from "react-native";
import { Stack, router } from "expo-router";
import { useState, useEffect } from "react";
import { WorkoutPlanResponse } from "@/domain/types";
import { localhost } from "@/constants";
import { WorkoutPlan } from "@/domain/types";
import search_exercises_styles from "@/assets/styles/exercises";
import { Button } from "@rneui/base";
import CreateWorkoutPlansModalScreen from "@modals/createWorkoutPlan";

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
        pathname: `/exercises/operations/workoutPlan-details/${workoutPlan.name}`,
        params: { workoutPlanJSON: JSON.stringify(workoutPlan) }
    });
}

export default function WorkoutPlansScreen() {
    const [workoutPlans, setWorkoutPlans] = useState<WorkoutPlan[]>([]);
    const [token, setToken] = useState<string>("");
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        const fetchWorkoutPlans = async () => {
            //const { userContext } = useContext(UserContext);

            /*if (userContext === null) {
                return;
            }

            if (userContext.token === undefined) {
                return;
            }

            setToken(userContext.token);*/
            setToken("147f3bb2-0791-41c2-8805-8dc660d9a157")
           
            const response = await fetch(`${localhost}8080/api/exercises/workoutPlans`, 
                {
                    method: 'GET',
                    headers: {
                      'Authorization': `Bearer 147f3bb2-0791-41c2-8805-8dc660d9a157`,
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

        fetchWorkoutPlans();
    }, []);

    const handleAddButtonPress = () => {
        router.push({ 
            pathname: `/exercise/createWorkoutPlanModal`,
            params: { token: token }
        });
    }

    const handleReload = async (token: string) => {
        const response = await fetch(`${localhost}8080/api/exercises/workoutPlans`, 
            {
                method: 'GET',
                headers: {
                  'Authorization': `Bearer 147f3bb2-0791-41c2-8805-8dc660d9a157`,
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

    return (
        <View>
            <Stack.Screen options={{ title: "Workout Plans" }}/>
            <View style={search_exercises_styles.workoutPlansResultContainer}>
                { workoutPlans.length !== 0 ?
                    <View>
                        <FlatList
                            data={workoutPlans}
                            renderItem={({ item }) => 
                                <Pressable onPress={() => {handleWorkoutPlanPress(item)}}>
                                    <WorkoutPlanResult {...item} />
                                </Pressable>
                            }
                            keyExtractor={(item: WorkoutPlan) => item.name}
                            refreshControl={
                                <RefreshControl
                                    refreshing={false}
                                    onRefresh={() => handleReload(token)}
                                />
                            }
                        /> 
                        <Button onPress={() => {setModalVisible(true)}}>Create Workout Plan</Button>
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