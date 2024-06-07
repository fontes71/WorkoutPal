import { StatusBar } from 'expo-status-bar';
import { Image, FlatList, StyleSheet, TouchableOpacity, Pressable, Platform, TextInput } from "react-native";

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { Stack, router, useLocalSearchParams } from "expo-router";
import trainingPlans_styles from '@/assets/styles/trainingPlans';
import { useEffect, useState } from 'react';
import { getLocalUser } from "@/assets/functions/auth";
import { localhost } from '@/constants';
import { TrainingPlan, TrainingPlanResponse } from '@/domain/types';
import { Button } from '@rneui/base';

const BottomText = ({ str }: { str: string | null }) => (
  <>{str && <Text style={trainingPlans_styles.bottomText}>{str}</Text>}</>
);

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
    const errorMessage: TrainingPlanResponse = await response.json()
    alert(errorMessage.message);
    return;
  }

  alert("Training plan created successfully");
  router.back();
}

export default function CreateTrainingPlansModalScreen() {
  const { token } = useLocalSearchParams<{ token: string }>();
  const tokenString = token as string;
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  return (
    <View>
      <Stack.Screen options={{ title: "Create Training Plan" }}/>
      <View style={trainingPlans_styles.inputs_container}>
       <TextInput 
          style={trainingPlans_styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
       <TextInput 
          style={trainingPlans_styles.input} 
          placeholder="Descritpion (Optional)"
          value={description}
          onChangeText={setDescription}
       />
       <View style={trainingPlans_styles.createTrainingPlanContainer}>
        <Button onPress={() => {handleCreateButtonPress(name, description, tokenString)}}>Create</Button>
       </View>
      </View>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}
