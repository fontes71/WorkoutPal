import { StatusBar } from 'expo-status-bar';
import { Modal, Image, FlatList, StyleSheet, TouchableOpacity, Pressable, Platform } from "react-native";
import { View, Text } from 'react-native';
import { Stack, useLocalSearchParams } from "expo-router";
import workoutPlans_styles from '@/assets/styles/workoutPlans';
import { useContext, useEffect, useState } from 'react';
import { localhost } from '@/constants';
import modal_styles from '@/assets/styles/modals';
import { MaterialIcons } from '@expo/vector-icons';
import { getLocalUser } from '@/assets/functions/auth';

const BottomText = ({ str }: { str: string | null }) => (
  <>{str && <Text style={workoutPlans_styles.bottomText}>{str}</Text>}</>
);

const WorkoutPlanResult: React.FC<any> = ({ name, description }) => {
  return (
      <View style={workoutPlans_styles.workoutPlansResultContainer}>
        <View style={workoutPlans_styles.workoutPlansResultTextContainer}>
          <Text style={workoutPlans_styles.topText}>{name}</Text>
          <BottomText str={'Description: ' + description} />
        </View>
      </View>
  );
}

export default function WorkoutPlansModalScreen({ isVisible, onClose, exerciseId }: { isVisible: boolean, onClose: () => void, exerciseId: string}){
  const [workoutPlans, setWorkoutPlans] = useState<WorkoutPlan[]>([]);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchWorkoutPlans = async () => {
        const user = await getLocalUser();
        setToken(user.token);

        const response = await fetch(`${localhost}8080/api/exercises/workoutPlans`,
            {
                method: 'GET',
                headers: {
                  'Authorization': `Bearer ${user.token}`,
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
    const response = await fetch(`${localhost}8080/api/exercises/workoutPlans/${workoutPlan.name}`,
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
        <Text style={workoutPlans_styles.title}>Workout Plans</Text>
        <View style={workoutPlans_styles.separator} />

        <View style={workoutPlans_styles.workoutPlansResultContainer}>
          <FlatList
              data={workoutPlans}
              renderItem={({ item }) => 
                  <Pressable onPress={() => {handleWorkoutPlanPress(item)}}>
                      <WorkoutPlanResult {...item} />
                  </Pressable>
              }
              keyExtractor={(item: WorkoutPlan) => item.name}
            />
          </View>
          {/* Use a light status bar on iOS to account for the black space above the modal */}
          <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
        </View>
      </View>
    </Modal>
  );
}
