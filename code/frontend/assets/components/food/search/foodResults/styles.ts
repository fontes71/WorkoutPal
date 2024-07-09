import { Colors } from "@/assets/constants";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: Colors.darkGray,
    padding: 25,
  },
  textContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  topText: {
    fontWeight: "bold",
    paddingBottom: 5,

    color: Colors.white
  },
  bottomText: {
    color: Colors.darkGray
  },
});

export default styles;
