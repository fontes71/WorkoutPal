import modal_styles from "@/assets/styles/modals";
import pickerSelectStyles from "@/assets/styles/pickerSelect";
import workoutPlans_styles from "@/assets/styles/workoutPlans";
import { MaterialIcons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import { Modal, Pressable, View, Text } from "react-native";
import RNPickerSelect from 'react-native-picker-select';

const bodyParts = [
    { label: 'Back', value: 'back' },
    { label: 'Cardio', value: 'cardio' },
    { label: 'Chest', value: 'chest' },
    { label: 'Lower Arms', value: 'lower arms' },
    { label: 'Lower Legs', value: 'lower legs' },
    { label: 'Neck', value: 'neck' },
    { label: 'Shoulders', value: 'shoulders' },
    { label: 'Upper Arms', value: 'upper arms' },
    { label: 'Upper Legs', value: 'upper legs' },
    { label: 'Waist', value: 'waist' },
];

const equipments = [
    { label: 'Assisted', value: 'assisted' },
    { label: 'Band', value: 'band' },
    { label: 'Barbell', value: 'barbell' },
    { label: 'Body Weight', value: 'body weight' },
    { label: 'Bosu Ball', value: 'bosu ball' },
    { label: 'Cable', value: 'cable' },
    { label: 'Dumbbell', value: 'dumbbell' },
    { label: 'Elliptical Machine', value: 'elliptical machine' },
    { label: 'EZ Barbell', value: 'ez barbell' },
    { label: 'Hammer', value: 'hammer' },
    { label: 'Kettlebell', value: 'kettlebell' },
    { label: 'Leverage Machine', value: 'leverage machine' },
    { label: 'Medicine Ball', value: 'medicine ball' },
    { label: 'Olympic Barbell', value: 'olympic barbell' },
    { label: 'Resistance Band', value: 'resistance band' },
    { label: 'Roller', value: 'roller' },
    { label: 'Rope', value: 'rope' },
    { label: 'Skierg Machine', value: 'skierg machine' },
    { label: 'Sled Machine', value: 'sled machine' },
    { label: 'Smith Machine', value: 'smith machine' },
    { label: 'Stability Ball', value: 'stability ball' },
    { label: 'Stationary Bike', value: 'stationary bike' },
    { label: 'Stepmill Machine', value: 'stepmill machine' },
    { label: 'Tire', value: 'tire' },
    { label: 'Trap Bar', value: 'trap bar' },
    { label: 'Upper Body Ergometer', value: 'upper body ergometer' },
    { label: 'Weighted', value: 'weighted' },
    { label: 'Wheel Roller', value: 'wheel roller'}
]

const targets = [
    { label: 'Abductors', value: 'abductors' },
    { label: 'Abs', value: 'abs' },
    { label: 'Adductors', value: 'adductors' },
    { label: 'Biceps', value: 'biceps' },
    { label: 'Calves', value: 'calves' },
    { label: 'Cardiovascular System', value: 'cardiovascular system' },
    { label: 'Delts', value: 'delts' },
    { label: 'Forearms', value: 'forearms' },
    { label: 'Glutes', value: 'glutes' },
    { label: 'Hamstrings', value: 'hamstrings' },
    { label: 'Lats', value: 'lats' },
    { label: 'Levator Scapulae', value: 'levator scapulae' },
    { label: 'Pectorals', value: 'pectorals' },
    { label: 'Quads', value: 'quads' },
    { label: 'Serratus Anterior', value: 'serratus anterior' },
    { label: 'Spine', value: 'spine' },
    { label: 'Traps', value: 'traps' },
    { label: 'Triceps', value: 'triceps' },
    { label: 'Upper Back', value: 'upper back' }
]

export default function SearchExerciseFilters({ isVisible, onClose, setBodyPart, setEquipment, setTarget }: { isVisible: boolean, onClose: () => void, setBodyPart: (value: string) => void, setEquipment: (value: string) => void, setTarget: (value: string) => void}) {
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
                            style={pickerSelectStyles}
                            placeholder={{ label: 'Select body part...', value: '', color: '#9EA0A4' }}
                        />
                        <View style={workoutPlans_styles.separator} />
                        <Text style={workoutPlans_styles.topText}>Equipment</Text>
                        <RNPickerSelect
                            onValueChange={(value) => { setEquipment(value) }}
                            items={equipments}
                            style={pickerSelectStyles}
                            placeholder={{ label: 'Select equipment...', value: '', color: '#9EA0A4' }}
                        />
                        <View style={workoutPlans_styles.separator} />
                        <Text style={workoutPlans_styles.topText}>Target</Text>
                        <RNPickerSelect
                            onValueChange={(value) => { setTarget(value) }}
                            items={targets}
                            style={pickerSelectStyles}
                            placeholder={{ label: 'Select target...', value: '', color: '#9EA0A4' }}
                        />
                    </View>
                </View>
            </View>
        </Modal>
    );
}