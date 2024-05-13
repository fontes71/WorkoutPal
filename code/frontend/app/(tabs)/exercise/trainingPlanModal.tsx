import { StatusBar } from 'expo-status-bar';
import { Image, FlatList, StyleSheet, TouchableOpacity, Pressable, Platform } from "react-native";

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { Stack, useLocalSearchParams } from "expo-router";
import trainingPlans_styles from '@/assets/styles/trainingPlans';
import { useEffect, useState } from 'react';
import { getLocalUser } from "@/assets/functions/auth";
import { localhost } from '@/constants';
import { TrainingPlan } from '@/domain/types';

const BottomText = ({ str }: { str: string | null }) => (
  <>{str && <Text style={trainingPlans_styles.bottomText}>{str}</Text>}</>
);

const TrainingPlanResult: React.FC<any> = ({ name, description }) => {
  return (
      <View style={trainingPlans_styles.trainingPlansResultContainer}>
        <View style={trainingPlans_styles.trainingPlansResultTextContainer}>
          <Text style={trainingPlans_styles.topText}>{name}</Text>
          <BottomText str={'Description: ' + description} />
        </View>
      </View>
  );
}

export default function ModalScreen() {
  const {exerciseId} = useLocalSearchParams<{ exerciseId: string }>();
  const [trainingPlans, setTrainingPlans] = useState<TrainingPlan[]>([]);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrainingPlans = async () => {
        const user = await getLocalUser();

        if (user === null) {
            return;
        }

        if (user.token === undefined) {
            return;
        }

        //setToken(user.token);
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
            return;
        }

        const trainingPlans: TrainingPlan[] = await response.json();
        setTrainingPlans(trainingPlans);
    }

    fetchTrainingPlans();
  }, []);

  const handleTrainingPlanPress = async (trainingPlan: TrainingPlan) => {
    console.log(trainingPlan);
  }

  return (
    <View style={trainingPlans_styles.trainingPlansContainer}>
      <Stack.Screen options={{ title: "Training Plans" }}/>
      <Text style={trainingPlans_styles.title}>Training Plans</Text>
      <View style={trainingPlans_styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

      <View style={trainingPlans_styles.trainingPlansResultContainer}>
        <FlatList
            data={trainingPlans}
            renderItem={({ item }) => 
                <Pressable onPress={() => {handleTrainingPlanPress(item)}}>
                    <TrainingPlanResult {...item} />
                </Pressable>
            }
            keyExtractor={(item: TrainingPlan) => item.name}
          />
      </View>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}
