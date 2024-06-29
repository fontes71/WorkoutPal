import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
  modalContainer: {
      justifyContent: "center",
      marginVertical: "80%",
    },
    modalOverlay: {
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: "rgba(0,0,0,0.5)"
    },
  });

  export default styles