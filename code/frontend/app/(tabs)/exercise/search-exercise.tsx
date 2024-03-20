import { StyleSheet } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { Link, Stack } from "expo-router";
import { SearchBar } from '@rneui/themed';
import { useState, useEffect } from "react";

export default function SearchExerciseScreen() {
    const [exerciseName, setExerciseName] = useState("");
    const [exercises, setExercises] = useState([]);
     
    useEffect(() => {
        const fetchExercise = async () => {
            const response = await fetch(`http://192.168.0.129:8080/api/exercises/name/${exerciseName}`);
            const exercise = await response.json();

            if (exercise.error_message !== undefined) {
                return;
            }
            
            setExercises(exercise);
        }
        fetchExercise();
    }, [exerciseName]);

    const updateExerciseName = (value: string) => {
        setExerciseName(value);
    }

    return (
        <View >
            <Stack.Screen options={{ title: "Searching exercise" }} />
            <SearchBar
                placeholder="Type Here..."
                onChangeText={updateExerciseName}
                value={exerciseName}
            />
            {exercises[0] !== undefined ? exercises.map(({name}) => <Text>{name}</Text>) : <Text>No exercise found</Text>}
        </View>
    );
}

const styles = StyleSheet.create({

});