import { StatusBar } from 'expo-status-bar';
import { Image, FlatList, StyleSheet, TouchableOpacity, Pressable, Platform, TextInput } from "react-native";

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { Stack, router, useLocalSearchParams } from "expo-router";
import workoutPlans_styles from '@/assets/styles/workoutPlans';
import { useEffect, useState } from 'react';
import { getLocalUser } from "@/assets/functions/auth";
import { localhost } from '@/constants';
import { WorkoutPlan, WorkoutPlanResponse } from '@/domain/types';
import { Button } from '@rneui/base';

const handleCreateButtonPress = async (workoutPlanName: string, description: string, token: string) => {
  const response = await fetch(`${localhost}8080/api/exercises/workoutPlans`, 
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ workoutPlanName, description })
    }
  )

  if (response.status !== 200) {
    const errorMessage: WorkoutPlanResponse = await response.json()
    alert(errorMessage.message);
    return;
  }
  alert("Workout plan created successfully");
  router.back();
}

export default function CreateWorkoutPlansModalScreen() {
  const { token } = useLocalSearchParams<{ token: string }>();
  const tokenString = token as string;
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  return (
    <View>
      <Stack.Screen options={{ title: "Create Workout Plan" }}/>
      <View style={workoutPlans_styles.inputs_container}>
       <TextInput 
          style={workoutPlans_styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
       <TextInput 
          style={workoutPlans_styles.input} 
          placeholder="Descritpion (Optional)"
          value={description}
          onChangeText={setDescription}
       />
       <View style={workoutPlans_styles.createWorkoutPlanContainer}>
        <Button onPress={() => {handleCreateButtonPress(name, description, tokenString)}}>Create</Button>
       </View>
      </View>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}
