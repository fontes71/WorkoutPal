import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#dadada",
    padding: 10,
  },
  textContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  topText: {
    fontWeight: "bold",
    paddingBottom: 5,
    fontSize: 16,
  },
  bottomText: {
    fontSize: 14,
  },
});

export default styles;
