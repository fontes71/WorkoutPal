import { Colors } from "@/assets/styles/common";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
      paddingTop: 30,
      paddingBottom: 30,
      textAlign: "center",
      color: Colors.white
    },
    button: {
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: Colors.blue, 
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 5, 
      shadowColor: '#000', 
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3, 
      shadowRadius: 2, 
    },
    buttonWrapper: {
      position: 'absolute',
      bottom: 20,
      right: 20,
    },
    buttonImg: {
      tintColor: Colors.white
    }
  });
  
  export default styles