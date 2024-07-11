import { Colors } from "@/assets/styles/common";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    dropdown: {
      borderBottomWidth: 1,
      borderBottomColor: Colors.white,
      width: 55,
      paddingHorizontal: 2,
      marginLeft: 10
    },
    selectedTextStyle: {
      fontSize: 16,
      color: Colors.white
    },
  });

  export default styles