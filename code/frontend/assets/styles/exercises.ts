import { StyleSheet } from "react-native";
import { Colors } from "../constants";

export const exercise_styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
    },
    link: {
      marginTop: 20,
      fontSize: 35,
      color: Colors.blue,
      fontWeight: "bold",
    }
  });

export const search_exercises_styles = StyleSheet.create({
    exercisesResultContainer: {
      flexDirection: "row",
      padding: 10,
      alignItems: "center",
      justifyContent: "space-evenly"
    },
    exerciseResultContainer: {
      flexDirection: "row",
      padding: 10,
      alignItems: "center",
      justifyContent: "space-evenly",
      borderBottomWidth: 0.2,
      borderBottomColor: Colors.darkGray,
    },
    workoutPlansResultContainer: {
      flex: 1,
      flexDirection: "column",
      padding: 10,
      justifyContent: "flex-start"
    },
    separator: {
      marginVertical: 30,
      height: 1,
      width: '80%',
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
        paddingHorizontal: 20,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-evenly",
        marginBottom: 20,
    },
    bottomTextContainer: {
        flexDirection: "row",
    },
    floatingButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        width: 60,
        height: 60,
        backgroundColor: Colors.blue,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1,
    },
    floatingButtonText: {
        color: 'white',
        fontSize: 30,
        lineHeight: 30,
    },
    filtersFloatingButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        width: 60,
        height: 60,
        backgroundColor: Colors.blue,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1,
    },
    filterIcon: {
        width: 30,
        height: 30,
      },
      badge: {
        position: 'absolute',
        top: -5,
        right: -5,
        backgroundColor: Colors.midBlue,
        borderRadius: 15,
        width: 25,
        height: 25,
        alignItems: 'center',
        justifyContent: 'center',
      },
      badgeText: {
        color: 'white',
        fontSize: 12,
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
    detailsContainer: {
        alignItems: "center",
        justifyContent: "space-evenly",
    },
});

export default search_exercises_styles;