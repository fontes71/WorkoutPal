import { Colors } from "@/assets/styles/common";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  nutrients: {
    flexDirection: "row",
    justifyContent: 'space-around',
    padding: 20,
    borderBottomWidth: 0.2,
    borderBottomColor: Colors.darkGray,
    
  },
  nutrientWrapper: {
    alignItems: 'center'
  },
  nutrientValue: {
    color:Colors.white
  },
  nutrient: {
    color: Colors.darkGray
    
  },
});

export default styles;
