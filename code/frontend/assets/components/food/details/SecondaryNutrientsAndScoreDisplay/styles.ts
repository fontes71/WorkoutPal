import { Colors } from "@/assets/styles/common";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  moreContainer: {
    marginTop: 10,
  },
  moreButton: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: 'center'
  },
  text_small: {
    fontSize: 16,
    color: Colors.white,
    fontWeight: 'bold'
  },
  arrowIcon: {
    marginTop: 3,
    tintColor: Colors.white
    
  },
  moreInfoContainer: {
    marginTop: 20,
  },
  nutriscoreWrapper: {
    alignItems: 'center',
    minWidth:40
  },
  nutriscoreValue: {
    color:Colors.white
  },
  nutriscore: {
    color: Colors.darkGray
  },
  row: {
    justifyContent: 'space-evenly',
  },
  separator: {
    height: 10,
  }
});

export default styles;
