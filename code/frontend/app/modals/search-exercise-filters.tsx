import { bodyParts, equipments, targets } from "@/assets/components/exercises/filterOptions";
import modal_styles from "@/assets/styles/modals";
import pickerSelectStyles from "@/assets/styles/pickerSelect";
import workoutPlans_styles from "@/assets/styles/workoutPlans";
import { MaterialIcons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import { Modal, Pressable, View, Text } from "react-native";
import RNPickerSelect from 'react-native-picker-select';

export default function SearchExerciseFilters({ isVisible, onClose, bodyPart, setBodyPart, equipment, setEquipment, target, setTarget }: { isVisible: boolean, onClose: () => void, bodyPart: string, setBodyPart: (value: string) => void, equipment: string, setEquipment: (value: string) => void, target: string, setTarget: (value: string) => void}) {
    return (
        <Modal animationType="slide" transparent={false} visible={isVisible}>
            <Stack.Screen options={{ title: "Filters" }}/>
            <View style={modal_styles.modalContent}>
                <View style={modal_styles.titleContainer}>
                    <Text style={modal_styles.title}>Filters</Text>
                    <Pressable onPress={onClose}>
                      <MaterialIcons name="close" size={24} color="#fff" />
                    </Pressable>
                </View>
                <View>
                    <View style={workoutPlans_styles.separator} />
                    <View style={workoutPlans_styles.inputs_container}>
                        <Text style={workoutPlans_styles.topText}>Body Part</Text>
                        <RNPickerSelect
                            onValueChange={(value) => { setBodyPart(value) }}
                            items={bodyParts}
                            value={bodyPart}
                            style={pickerSelectStyles}
                            placeholder={{ label: 'Select body part...', value: "", color: '#9EA0A4' }}
                        />
                        <View style={workoutPlans_styles.separator} />
                        <Text style={workoutPlans_styles.topText}>Equipment</Text>
                        <RNPickerSelect
                            onValueChange={(value) => { setEquipment(value) }}
                            items={equipments}
                            value={equipment}
                            style={pickerSelectStyles}
                            placeholder={{ label: 'Select equipment...', value: "", color: '#9EA0A4' }}
                        />
                        <View style={workoutPlans_styles.separator} />
                        <Text style={workoutPlans_styles.topText}>Target</Text>
                        <RNPickerSelect
                            onValueChange={(value) => { setTarget(value) }}
                            items={targets}
                            value={target}
                            style={pickerSelectStyles}
                            placeholder={{ label: 'Select target...', value: "", color: '#9EA0A4' }}
                        />
                    </View>
                </View>
            </View>
        </Modal>
    );
}