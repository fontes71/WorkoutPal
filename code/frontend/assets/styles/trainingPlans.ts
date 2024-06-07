import { StyleSheet } from "react-native";
import { create } from "react-test-renderer";

const trainingPlans_styles = StyleSheet.create({
    trainingPlansContainer: {
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
    trainingPlansResultContainer: {
      flexDirection: "row",
      padding: 10,
    },
    trainingPlansResultTextContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "space-evenly",
    },
    createTrainingPlanContainer: {
      flex: 1,
      alignItems: 'center',
    },
    inputs_container: {
      paddingBottom: 35,
      paddingHorizontal: 30,
      height: '100%',
    },
    input: {
      backgroundColor: 'white',
      height: 43,
      borderColor: 'gray',
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
        fontSize: 18
    },
    bottomText: {
        marginRight: 10,
        fontSize: 14
    },
});

export default trainingPlans_styles;