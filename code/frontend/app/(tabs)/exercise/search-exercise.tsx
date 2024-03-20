import { StyleSheet } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { Link, Stack } from "expo-router";
import { SearchBar } from '@rneui/themed';
import { useState, useEffect } from "react";


export default function SearchExerciseScreen() {
    const [exerciseName, setExerciseName] = useState("");
    const [exercises, setExercises] = useState([]);
    const [inputValue, setInputValue] = useState('');
     
    useEffect(() => {
        const fetchExercise = async () => {
            console.log("HERE");
            const response = await fetch(`http://192.168.1.96:8080/api/exercises/name/${exerciseName}`);
            const exercise = await response.json();

            console.log("input -> ", exercise);

            if (exercise.error_message !== undefined) {
                return;
            }
            
            setExercises(exercise);
        }
        fetchExercise();
    }, [exerciseName]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            //console.log("update -> ", inputValue);
            setExerciseName(inputValue);
        }, 300);

        return () => clearTimeout(timeout);
    }, [inputValue]);

    const updateExerciseName = (value: string) => {
       
        setInputValue(value);
    }

    return (
        <View >
            <Stack.Screen options={{ title: "Searching exercise" }} />
            <SearchBar
                placeholder="Type Here..."
                onChangeText={updateExerciseName}
                value={inputValue}
            />
            {exercises[0] !== undefined ? exercises.map(({name}) => <Text>{name}</Text>) : <Text>No exercise found</Text>}
        </View>
    );
}

const styles = StyleSheet.create({

});