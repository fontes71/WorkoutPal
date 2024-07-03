import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    title: {
      fontSize: 22,
      fontWeight: "bold",
      paddingTop: 30,
      paddingBottom: 30,
      textAlign: "center",
    },
    button: {
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: 'white', // Change this to any color you want for the button background
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 5, // For Android shadow
      shadowColor: '#000', // For iOS shadow
      shadowOffset: { width: 0, height: 2 }, // For iOS shadow
      shadowOpacity: 0.3, // For iOS shadow
      shadowRadius: 2, // For iOS shadow
    },
    buttonWrapper: {
      position: 'absolute',
      bottom: 20,
      right: 20,
    }
  });
  
  export default styles