import { StyleSheet } from "react-native";
import { Colors } from "../constants";

const workoutPlans_styles = StyleSheet.create({
    workoutPlansContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    separator: {
      marginVertical: 30,
      height: 1,
      width: '80%',
    },
    workoutPlansResultContainer: {
      flexDirection: "row",
      padding: 10
    },
    workoutPlanResultContainer: {
      flexDirection: "row",
      padding: 10,
      borderBottomWidth: 0.2,
      borderBottomColor: Colors.darkGray,
    },
    workoutPlansResultTextContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "space-evenly",
    },
    createWorkoutPlanContainer: {
      flex: 1,
      alignItems: 'center',
    },
    inputs_container: {
      paddingBottom: 35,
      paddingHorizontal: 30,
      height: '100%',
    },
    input: {
      backgroundColor: Colors.white,
      height: 43,
      borderColor: Colors.gray,
      borderWidth: 1,
      paddingHorizontal: 20,
      marginBottom: 15,
      borderRadius: 10,
    },
    bottomTextContainer: {
        flexDirection: "row",
    },
    topText: {
        fontWeight: "bold",
        paddingBottom: 5,
        fontSize: 18,
        color: Colors.white
    },
    bottomText: {
        marginRight: 10,
        fontSize: 14,
        color: Colors.white
    },
});

export default workoutPlans_styles;