import { View, Text } from "react-native";
import { BottomText } from "./bottomText";
import workoutPlans_styles from "@/assets/styles/workoutPlans";

export const WorkoutPlanResult: React.FC<any> = ({ name, description }) => {
    return (
        <View style={workoutPlans_styles.workoutPlansResultContainer}>
          <View style={workoutPlans_styles.workoutPlansResultTextContainer}>
            <Text style={workoutPlans_styles.topText}>{name}</Text>
            <BottomText str={'Description: ' + description} />
          </View>
        </View>
    );
}