import { StatusBar } from 'expo-status-bar';
import { Image, FlatList, StyleSheet, TouchableOpacity, Pressable, Platform } from "react-native";

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { Stack, useLocalSearchParams } from "expo-router";
import workoutPlans_styles from '@/assets/styles/workoutPlans';
import { useContext, useEffect, useState } from 'react';
import { localhost } from '@/constants';
import { WorkoutPlan, WorkoutPlanResponse } from '@/domain/types';
import { UserContext } from '@/assets/components/auth/AuthContext';

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

export default function WorkoutPlansModalScreen() {
  const {exerciseId} = useLocalSearchParams<{ exerciseId: string }>();
  const [workoutPlans, setWorkoutPlans] = useState<WorkoutPlan[]>([]);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchWorkoutPlans = async () => {
        //const { userContext } = useContext(UserContext);

        /*if (!userContext) {
            return;
        }

        if (userContext.token === undefined) {
            return;
        }

        setToken(userContext.token);*/
        setToken("147f3bb2-0791-41c2-8805-8dc660d9a157");

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
    console.log(workoutPlan)
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
    <View style={workoutPlans_styles.workoutPlansContainer}>
      <Stack.Screen options={{ title: "Workout Plans" }}/>
      <Text style={workoutPlans_styles.title}>Workout Plans</Text>
      <View style={workoutPlans_styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

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
  );
}
