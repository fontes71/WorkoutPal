import { Image, StyleSheet } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { Exercise } from "@/domain/types";

const BottomText = ({ str }: { str: string | null }) => (
    <>{str && <Text style={styles.bottomText}>{str}</Text>}</>
);

export default function ExerciseDetailsScreen(exercise: Exercise) {
    return (
        <View style={styles.exerciseResultContainer}>
            <View style={styles.exerciseResultTextContainer}>
                <Text style={styles.topText}>{exercise.name}</Text>
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
    );
}

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