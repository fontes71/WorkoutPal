import { Colors } from "@/assets/styles/common";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  mainNutrientsContainer: {
    flex: 1,
    height: 90,
  },
  macronutrientsContainer: {
    flex:1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: 'center'
  },
  text: {
    color: Colors.white,
    fontSize: 15
  },
  caloriesWrapper: {
    alignItems: 'center'
  }
 
})

export default styles