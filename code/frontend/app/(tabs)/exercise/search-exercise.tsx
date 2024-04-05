import { Image, FlatList, StyleSheet, TouchableOpacity, Pressable  } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { Link, Stack, router } from "expo-router";
import { SearchBar } from '@rneui/themed';
import { useState, useEffect } from "react";
import { Exercise } from "@/domain/types";
import { localhost } from "@/constants";

const BottomText = ({ str }: { str: string | null }) => (
    <>{str && <Text style={styles.bottomText}>{str}</Text>}</>
);
  

const ExerciseResult: React.FC<Exercise> = ({ name, gifUrl, equipment }) => {
    return (
        <View style={styles.exerciseResultContainer}>
          <View style={styles.imageContainer}>
            {gifUrl && (
              <Image
                style={styles.exerciseGifResult}
                source={{uri: gifUrl}}
              />
            )}
          </View>
          <View style={styles.exerciseResultTextContainer}>
            <Text style={styles.topText}>{name}</Text>
            <BottomText str={'Equipment: ' + equipment} />
          </View>
        </View>
    );
}

export default function SearchExerciseScreen() {
    const [exerciseName, setExerciseName] = useState("");
    const [exercises, setExercises] = useState<Exercise[]>([]);
     
    const handleEnter = () => {
        const fetchExercise = async () => {
            const response = await fetch(`${localhost}8080/api/exercises/name/${exerciseName}`);

            if (response.status !== 200) {
                return;
            }

            const exercise: Exercise[] = await response.json();
            setExercises(exercise);
        }

        if (exerciseName.length > 1) fetchExercise();
    }

    const updateExerciseName = (value: string) => {
        setExerciseName(value);
    }

    const handleExercisePress = async (exercise: Exercise) => {
        router.push({
            pathname: `/exercise/details/${exercise._id}`,
            params: { exerciseJSON: JSON.stringify(exercise) }
        });
    }

    return (
        <View >
            <Stack.Screen options={{ title: "Search exercise" }} />
            <SearchBar
                placeholder="Type Here..."
                onSubmitEditing={handleEnter}
                returnKeyType="search"
                onChangeText={updateExerciseName}
                value={exerciseName}
            />
            <FlatList
                    data={exercises}
                    renderItem={({ item }) => 
                        <Pressable onPress={() => {handleExercisePress(item)}}>
                            <ExerciseResult {...item} />
                        </Pressable>
                    }
                    keyExtractor={(item: Exercise) => item._id}
                />
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
    },
    detailsContainer: {
        alignItems: "center",
        justifyContent: "space-evenly",
    },
});