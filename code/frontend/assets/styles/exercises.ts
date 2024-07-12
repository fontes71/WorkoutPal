import { StyleSheet } from "react-native";
import { Colors } from "@/assets/styles/common";

export const exercise_styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center"
    },
    linksContainer: {
      width: "60%",
      height: 50,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: 'space-evenly',
      margin: 15,
      borderRadius: 15,
      borderWidth: 2,
      borderColor: Colors.blue,
      marginTop: 30
    },
    title: {
      paddingTop: 20,
      fontSize: 20,
      fontWeight: "bold",
      color: Colors.white,
      textAlign: "center",
    },
    link: {
      fontSize: 20,
      color: Colors.white,
      fontWeight: "bold"
    },
    separator: {
      marginVertical: 5,
      height: 1,
      width: '80%',
    },
    workoutPlansContainer: {
      flex: 1,
      width: "90%",
      margin: 15,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: Colors.white,
    }
  });

export const search_exercises_styles = StyleSheet.create({
    exercisesResultContainer: {
      flexDirection: "row",
      padding: 10,
      alignItems: "center",
      justifyContent: "space-evenly",
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
      padding: 10,
    },
    separator: {
      marginVertical: 30,
      height: 1,
      width: '80%',
    },
    imageContainer: {
        justifyContent: "center",
    },
    exerciseGifResult: {
        width: 75,
        height: 75,
    },
    exerciseResultTextContainer: {
        flex: 1,
        paddingHorizontal: 20,
        flexDirection: "column",
        justifyContent: "space-evenly",
        marginBottom: 20,
    },
    workoutPlanResultTextContainer: {
      flex: 1,
      paddingHorizontal: 20,
      flexDirection: "column",
      justifyContent: "space-evenly",
      alignItems: "center",
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
    workoutPlansfloatingButton: {
      position: 'absolute',
      bottom: 10,
      right: 5,
      width: 50,
      height: 50,
      backgroundColor: Colors.blue,
      borderRadius: 30,
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1,
    },
    workoutPlansfloatingButtonText: {
        color: 'white',
        fontSize: 25,
        lineHeight: 25,
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
    title: {
      fontWeight: "bold",
      paddingBottom: 5,
      fontSize: 22,
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
    itemsContainer: {
      backgroundColor: Colors.lightBlack, 
      height: 70, 
      marginTop: 20, 
      width: "90%", 
      flexDirection: "row", 
      justifyContent: "center",
      borderRadius: 10
    },
    itemsImageAndTextContainer: {
      width: "70%", 
      height: "100%", 
      alignItems: "center", 
      justifyContent: "center", 
      flexDirection: "row"
    },
    itemsImage: {
      width: 35, 
      height: 35
    },
    itemsText: {
      fontSize: 18, 
      color: Colors.white, 
      fontWeight: "bold"
    },
    exercisesContainer: {
      flex: 1,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: Colors.white,
    },
    exerciseDetailsContainer: {
      padding: 20, 
      alignItems: "center"
    },
    exerciseDetailsImageAndTextContainer: { 
      flexDirection: "row", 
      paddingTop: 12, 
      borderTopWidth: 1, 
      borderBottomWidth: 1, 
      borderColor: Colors.darkGray,
      marginBottom: 10
    },
    exerciseDetailsTextContainer: { 
      flex: 1, 
      height: 90, 
      flexDirection: "column", 
      alignItems: 'center',
      marginLeft: 20
    },
    exerciseDetailsHorizontalTextContainer: { 
      flexDirection: 'row', 
      alignItems: 'center', 
      marginBottom: 10 
    },
    exerciseDetailsPropertyTextContainer: { 
      flexDirection: 'column', 
      alignItems: 'center',
      marginHorizontal: 10 
    },
    exerciseDetailsPropertyText: { 
      color: Colors.white 
    },
    exerciseDetailsPropertyTextBold: { 
      fontWeight: 'bold', 
      color: Colors.white 
    }
});

export const exercise_screen_styles = StyleSheet.create({
  exercisesResultContainer: {
    padding: 10,
    alignItems: "center",
    justifyContent: "space-evenly"
  },
  imageContainer: {
      justifyContent: "center",
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
  workoutPlansfloatingButton: {
    position: 'absolute',
    bottom: 10,
    right: 5,
    width: 50,
    height: 50,
    backgroundColor: Colors.blue,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  workoutPlansfloatingButtonText: {
      color: 'white',
      fontSize: 25,
      lineHeight: 25,
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
  title: {
    fontWeight: "bold",
    paddingBottom: 5,
    fontSize: 22,
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
  itemsContainer: {
    backgroundColor: Colors.lightBlack, 
    height: 70, 
    marginTop: 20, 
    width: "90%", 
    flexDirection: "row", 
    justifyContent: "center",
    borderRadius: 10
  },
  itemsImageAndTextContainer: {
    width: "70%", 
    height: "100%", 
    alignItems: "center", 
    justifyContent: "center", 
    flexDirection: "row"
  },
  itemsImage: {
    width: 35, 
    height: 35
  },
  itemsText: {
    fontSize: 18, 
    color: Colors.white, 
    fontWeight: "bold"
  },
  exercisesContainer: {
    flex: 1,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.white,
  }
});

export default search_exercises_styles;