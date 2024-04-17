import { Image, StyleSheet } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { Exercise } from "@/domain/types";
import { Link, useLocalSearchParams } from "expo-router";
import { Stack } from "expo-router";
import exercises_styles from "@/assets/styles/exercises";
import { Button } from "@rneui/base";
import { router } from "expo-router";

const BottomText = ({ str }: { str: string | null }) => (
    <>{str && <Text style={exercises_styles.bottomText}>{str}</Text>}</>
);

const ExerciseDetailsScreen = () => {
    const { exerciseJSON } = useLocalSearchParams<{ exerciseJSON: string }>();
    const exercise = JSON.parse(exerciseJSON) as Exercise;

    return (
        <View>
            <Stack.Screen options={{ title: "Details" }}/>
            <View style={exercises_styles.exerciseResultContainer}>
                <View style={exercises_styles.exerciseResultTextContainer}>
                    <Text style={exercises_styles.topText}>{exercise.name}</Text>
                    <View style={exercises_styles.imageContainer}>
                    {exercise.gifUrl && (
                        <Image
                            style={exercises_styles.exerciseGifResult}
                            source={{uri: exercise.gifUrl}}
                        />
                    )}
                </View>
                    <BottomText str={'Equipment: ' + exercise.equipment} />
                    <BottomText str={'Body Part: ' + exercise.bodyPart} />
                    <BottomText str={'Target: ' + exercise.target} />
                    <BottomText str={'Secondary Muscles: ' + exercise.secondaryMuscles.join(', ')} />
                    <Text style={exercises_styles.topText}></Text>
                    <Text style={exercises_styles.topText}>Instructions:</Text>
                    {exercise.instructions.map((instruction, index) => (
                        <Text key={index} style={exercises_styles.bottomText}>{instruction}</Text>
                    ))}
                    <Button onPress={() => {router.push("/(tabs)/exercise/trainingPlanModal")}}>Add To Training Plan</Button>
                </View>
            </View>
        </View>
    );
}

export default ExerciseDetailsScreen;