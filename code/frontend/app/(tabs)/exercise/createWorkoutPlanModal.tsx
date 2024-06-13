import { StatusBar } from "expo-status-bar";
import {
  Modal,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Platform,
  TextInput,
} from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { Stack, router, useLocalSearchParams } from "expo-router";
import workoutPlans_styles from "@/assets/styles/workoutPlans";
import { useEffect, useState } from "react";
import { getLocalUser } from "@/assets/functions/auth";
import { localhost } from "@/constants";
import { Button } from "@rneui/base";
import modal_styles from "@/assets/styles/modals";
import { MaterialIcons } from "@expo/vector-icons";

export default function CreateWorkoutPlansModalScreen({
  isVisible,
  onClose,
}: {
  isVisible: boolean;
  onClose: () => void;
}) {
  const { token } = useLocalSearchParams<{ token: string }>();
  const tokenString = token as string;
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const handleCreateButtonPress = async (
    workoutPlanName: string,
    description: string,
    token: string
  ) => {
    const response = await fetch(
      `${localhost}8080/api/exercises/workoutPlans`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ workoutPlanName, description }),
      }
    );

    if (response.status !== 200) {
      const errorMessage: WorkoutPlanResponse = await response.json();
      alert(errorMessage.message);
      return;
    }
    alert("Workout plan created successfully");
    onClose();
  };

  return (
    <Modal animationType="slide" transparent={false} visible={isVisible}>
      <Stack.Screen options={{ title: "Create Workout Plan" }} />
      <View style={modal_styles.modalContent}>
        <View style={modal_styles.titleContainer}>
          <Text style={modal_styles.title}>Create Workout Plan</Text>
          <Pressable onPress={onClose}>
            <MaterialIcons name="close" size={24} color="#fff" />
          </Pressable>
        </View>
        <View>
          <View style={workoutPlans_styles.separator} />
          <View style={workoutPlans_styles.inputs_container}>
            <TextInput
              style={workoutPlans_styles.input}
              placeholder="Name"
              value={name}
              onChangeText={setName}
            />
            <TextInput
              style={workoutPlans_styles.input}
              placeholder="Descritpion (Optional)"
              value={description}
              onChangeText={setDescription}
            />
            <View style={workoutPlans_styles.createWorkoutPlanContainer}>
              <Button
                onPress={() => {
                  handleCreateButtonPress(name, description, tokenString);
                }}
              >
                Create
              </Button>
            </View>
          </View>

          {/* Use a light status bar on iOS to account for the black space above the modal */}
          <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
        </View>
      </View>
    </Modal>
  );
}
