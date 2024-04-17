import { StatusBar } from 'expo-status-bar';
import { Image, FlatList, StyleSheet, TouchableOpacity, Pressable, Platform } from "react-native";

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { Stack } from "expo-router";
import trainingPlans_styles from '@/assets/styles/trainingPlans';

interface TrainingPlan {
  name: string;
  description: string;
  exercises: string[];
}

const BottomText = ({ str }: { str: string | null }) => (
  <>{str && <Text style={trainingPlans_styles.bottomText}>{str}</Text>}</>
);

const trainingPlans: TrainingPlan[] = [
  {name: "Training Plan 1", description: "Description 1", exercises: ["Exercise 1", "Exercise 2", "Exercise 3"]},
  {name: "Training Plan 2", description: "Description 2", exercises: ["Exercise 4", "Exercise 5", "Exercise 6"]},
  {name: "Training Plan 3", description: "Description 2", exercises: ["Exercise 7", "Exercise 8", "Exercise 9"]},
];

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
