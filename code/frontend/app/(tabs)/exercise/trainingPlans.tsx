import { Image, FlatList, StyleSheet, TouchableOpacity, Pressable  } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { Link, Stack, router } from "expo-router";
import { SearchBar } from '@rneui/themed';
import { useState, useEffect } from "react";
import { Exercise } from "@/domain/types";
import { localhost } from "@/constants";
import { TrainingPlan } from "@/domain/types";
import search_exercises_styles from "@/utils/styles/exercises";
import { getLocalUser } from "@/domain/auth";

const BottomText = ({ str }: { str: string | null }) => (
    <>{str && <Text style={search_exercises_styles.bottomText}>{str}</Text>}</>
);

const TrainingPlanResult: React.FC<TrainingPlan> = ({ name, description }) => {
    return (
        <View style={search_exercises_styles.exerciseResultContainer}>
          <View style={search_exercises_styles.exerciseResultTextContainer}>
            <Text style={search_exercises_styles.topText}>{name}</Text>
            <BottomText str={'Description: ' + description} />
          </View>
        </View>
    );
}

const handleTrainingPlanPress = (trainingPlan: TrainingPlan) => {
    router.push({
        pathname: `/exercise/trainingPlan-details/${trainingPlan.name}`,
        params: { trainingPlanJSON: JSON.stringify(trainingPlan) }
    });
}

export default function TrainingPlansScreen() {
    const [trainingPlans, setTrainingPlans] = useState<TrainingPlan[]>([]);

    useEffect(() => {
        const fetchTrainingPlans = async () => {
            const user = await getLocalUser();

            if (user === null) {
                return;
            }

            if (user.token === undefined) {
                return;
            }

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

    return (
        <View>
            <Stack.Screen options={{ title: "Training Plans" }}/>
            <View style={search_exercises_styles.exerciseResultContainer}>
                { trainingPlans.length !== 0 ?
                    <FlatList
                        data={trainingPlans}
                        renderItem={({ item }) => 
                            <Pressable onPress={() => {handleTrainingPlanPress(item)}}>
                                <TrainingPlanResult {...item} />
                            </Pressable>
                        }
                        keyExtractor={(item: TrainingPlan) => item.name}
                    /> : 
                    <View style={search_exercises_styles.exerciseResultTextContainer}>
                        <Text style={search_exercises_styles.topText}>Loading your training plans...</Text>
                    </View>
                }
            </View>
        </View>
    );
    
}