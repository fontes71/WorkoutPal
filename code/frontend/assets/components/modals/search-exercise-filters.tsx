import { FiltersInfo } from "@/assets/components/exercises/FiltersInfo";
import { bodyParts, equipments, targets } from "@/assets/components/exercises/filterOptions";
import { Colors } from "@/assets/styles/common";
import modal_styles from "@/assets/styles/modals";
import pickerSelectStyles from "@/assets/styles/pickerSelect";
import workoutPlans_styles from "@/assets/styles/workoutPlans";
import { MaterialIcons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import { Modal, Pressable, View, Text } from "react-native";
import RNPickerSelect from 'react-native-picker-select';

export default function SearchExerciseFilters({ isVisible, onClose, filters, setFilters }: { isVisible: boolean, onClose: () => void, filters: FiltersInfo, setFilters: (value: FiltersInfo) => void}) {
    return (
        <Modal animationType="slide" transparent={true} visible={isVisible}>
            <Stack.Screen options={{ title: "Filters" }}/>
            <View style={modal_styles.modalContent}>
                <View style={modal_styles.titleContainer}>
                    <Text style={modal_styles.title}>Filters</Text>
                    <Pressable onPress={onClose}>
                      <MaterialIcons name="close" size={24} color={Colors.white} />
                    </Pressable>
                </View>
                <View>
                    <View style={workoutPlans_styles.separator} />
                    <View style={workoutPlans_styles.inputs_container}>
                        <Text style={workoutPlans_styles.topText}>Body Part</Text>
                        <RNPickerSelect
                            onValueChange={(value) => { setFilters({ ...filters, bodyPart: value }) }}
                            items={bodyParts}
                            value={filters.bodyPart}
                            style={pickerSelectStyles}
                            placeholder={{ label: 'Select body part...', value: "", color: Colors.gray }}
                        />
                        <View style={workoutPlans_styles.separator} />
                        <Text style={workoutPlans_styles.topText}>Equipment</Text>
                        <RNPickerSelect
                            onValueChange={(value) => { setFilters({ ...filters, equipment: value }) }}
                            items={equipments}
                            value={filters.equipment}
                            style={pickerSelectStyles}
                            placeholder={{ label: 'Select equipment...', value: "", color: Colors.gray }}
                        />
                        <View style={workoutPlans_styles.separator} />
                        <Text style={workoutPlans_styles.topText}>Target</Text>
                        <RNPickerSelect
                            onValueChange={(value) => { setFilters({ ...filters, target: value }) }}
                            items={targets}
                            value={filters.target}
                            style={pickerSelectStyles}
                            placeholder={{ label: 'Select target...', value: "", color: Colors.gray }}
                        />
                    </View>
                </View>
            </View>
        </Modal>
    );
}