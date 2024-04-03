import { Image, StyleSheet } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { Exercise } from "@/domain/types";
import { useLocalSearchParams } from "expo-router";
import { Stack } from "expo-router";

const BottomText = ({ str }: { str: string | null }) => (
    <>{str && <Text style={styles.bottomText}>{str}</Text>}</>
);

/*const ExerciseDetailsScreen = () => {
    const { exercise } = useLocalSearchParams<{ exercise: string }>();
    const exerciseOBJ = JSON.parse(exercise) as Exercise;

    return (
        <View>
            <Stack.Screen options={{ title: `${exerciseOBJ.name} Details` }}/>
            <Text>Exercise Details</Text>
        </View>
    )
}*/

const ExerciseDetailsScreen = () => {
    const { exerciseJSON } = useLocalSearchParams<{ exerciseJSON: string }>();
    const exercise = JSON.parse(exerciseJSON) as Exercise;

    return (
        <View>
            <Stack.Screen options={{ title: `${exercise.name}` }}/>
            <View style={styles.exerciseResultContainer}>
                <View style={styles.exerciseResultTextContainer}>
                    <View style={styles.imageContainer}>
                    {exercise.gifUrl && (
                        <Image
                            style={styles.exerciseGifResult}
                            source={{uri: exercise.gifUrl}}
                        />
                    )}
                </View>
                    <BottomText str={'Equipment: ' + exercise.equipment} />
                    <BottomText str={'Body Part: ' + exercise.bodyPart} />
                    <BottomText str={'Target: ' + exercise.target} />
                    <BottomText str={'Secondary Muscles: ' + exercise.secondaryMuscles.join(', ')} />
                    <Text style={styles.topText}></Text>
                    <Text style={styles.topText}>Instructions:</Text>
                    {exercise.instructions.map((instruction, index) => (
                        <Text key={index} style={styles.bottomText}>{instruction}</Text>
                    ))}
                </View>
            </View>
        </View>
    );
}

export default ExerciseDetailsScreen;

const styles = StyleSheet.create({
    exerciseResultContainer: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: "#000",
        padding: 10,
    },
    imageContainer: {
        width: 90,
        height: 90,
        marginRight: 10,
    },
    exerciseGifResult: {
        flex: 1
    },
    exerciseResultTextContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-evenly",
    },
    bottomTextContainer: {
        flexDirection: "row",
    },
    topText: {
        fontWeight: "bold",
        paddingBottom: 5,
        fontSize: 18
    },
    bottomText: {
        marginRight: 10,
        fontSize: 14
    }
});