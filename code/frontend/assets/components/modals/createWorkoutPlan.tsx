import { Modal, Pressable, TextInput, StatusBar } from "react-native";
import { View, Text } from 'react-native';
import { Stack, router } from "expo-router";
import { useContext, useEffect, useState } from 'react';
import { Colors, localhost } from '@/assets/constants';
import { Button } from '@rneui/base';
import modal_styles from '@/assets/styles/modals';
import { MaterialIcons } from '@expo/vector-icons';
import { UserContext } from '@/assets/components/auth/AuthContext';
import workoutPlans_styles from '@/assets/styles/workoutPlans';

export default function CreateWorkoutPlansModalScreen({ isVisible, onClose }: { isVisible: boolean, onClose: () => void }) {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [userToken, setUserToken] = useState<string>("");
  const { userContext } = useContext(UserContext);

  const handleCreateButtonPress = async (workoutPlanName: string, description: string, token: string) => {
    const response = await fetch(`${localhost}/api/exercises/workoutPlans`, 
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ workoutPlanName, description })
      }
    )
  
    if (response.status !== 200) {
      const errorMessage: WorkoutPlanResponse = await response.json()
      alert(errorMessage.message);
      return;
    }
    alert("Workout plan created successfully");
    onClose();
  }

  useEffect(() => {
    if (userToken == "") {
      if (!userContext) {
        router.push(`/auth/login/`);
        return;
      }
      setUserToken(userContext.token)
    }
  }, []);

  return (
    <Modal animationType="slide" transparent={false} visible={isVisible}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.lightBlack} />
      <Stack.Screen options={{ title: "Create Workout Plan" }}/>
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
            <Button onPress={() => {handleCreateButtonPress(name, description, userToken)}}>Create</Button>
           </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}
