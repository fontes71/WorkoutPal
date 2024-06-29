import { Modal, FlatList, Pressable } from "react-native";
import { View, Text } from 'react-native';
import { Stack, router } from "expo-router";
import { useContext, useEffect, useState } from 'react';
import { localhost } from '@/constants';
import modal_styles from '@/assets/styles/modals';
import { MaterialIcons } from '@expo/vector-icons';
import { UserContext } from '@/assets/components/auth/AuthContext';
import workoutPlans_styles from '@/assets/styles/workoutPlans';
import { WorkoutPlanResult } from "@/assets/components/exercises/WorkoutPlanResult";
import NoBottomCutView from "@/assets/components/views/NoBottomCutView";

export default function WorkoutPlansModalScreen({ isVisible, onClose, exerciseId }: { isVisible: boolean, onClose: () => void, exerciseId: string}){
  const [workoutPlans, setWorkoutPlans] = useState<WorkoutPlan[]>([]);
  const [token, setToken] = useState<string | null>(null);
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
          const errorMessage: WorkoutPlanResponse = await response.json()
          alert(errorMessage.message);
          return;
        }

        const workoutPlans: WorkoutPlanResponse = await response.json();
        setWorkoutPlans(workoutPlans.obj);
    }

    fetchWorkoutPlans();
  }, []);

  const handleWorkoutPlanPress = async (workoutPlan: WorkoutPlan) => {
    const response = await fetch(`${localhost}/api/exercises/workoutPlans/${workoutPlan.name}`,
      {
        method: 'POST',
        headers: {
          authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({exerciseId: exerciseId})
      }
    )

    if (response.status !== 200) {
      if(response.status === 409) {
        alert("Exercise already exists in workout plan");
      } else {
        alert("Failed to add exercise to workout plan");
      }
      return;
    }

    alert("Exercise Added");
    return;
  }

  return (
    <NoBottomCutView>
      <Modal animationType="slide" transparent={false} visible={isVisible}>
        <Stack.Screen options={{ title: "Workout Plans" }}/>
        <View style={modal_styles.modalContent}>
          <View style={modal_styles.titleContainer}>
            <Text style={modal_styles.title}>Select a Workout Plan</Text>
            <Pressable onPress={onClose}>
              <MaterialIcons name="close" color="#fff" size={22} />
            </Pressable>
          </View>
          <View style={workoutPlans_styles.workoutPlansContainer}>
            <View style={workoutPlans_styles.workoutPlansResultContainer}>
              <FlatList
                  data={workoutPlans}
                  renderItem={({ item }) => 
                      <Pressable onPress={() => {handleWorkoutPlanPress(item)}}>
                          <WorkoutPlanResult {...item} />
                      </Pressable>
                  }
                  keyExtractor={(item: WorkoutPlan) => item.name}
                  contentContainerStyle={{ paddingBottom: 40 }}
                />
            </View>
          </View>
        </View>
      </Modal>
    </NoBottomCutView>
  );
}
