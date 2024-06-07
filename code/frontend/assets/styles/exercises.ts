import { Button } from "@rneui/base";
import { StyleSheet } from "react-native";

export const exercise_styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
    },
    link: {
      marginTop: 20,
      fontSize: 35,
      color: '#2e78b7'
    },
  });

export const search_exercises_styles = StyleSheet.create({
    exerciseResultContainer: {
        flexDirection: "row",
        padding: 10,
        alignItems: "center",
        justifyContent: "space-evenly",
    },
    traingPlansResultContainer: {
        flexDirection: "column",
        padding: 10,
        justifyContent: "space-evenly",
    },
    imageContainer: {
        width: 90,
        height: 90,
        marginRight: 10,
    },
    exerciseGifResult: {
        flex: 1
    },
    exerciseResultTextContainer: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-evenly",
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
    detailsContainer: {
        alignItems: "center",
        justifyContent: "space-evenly",
    },
});

export default search_exercises_styles;