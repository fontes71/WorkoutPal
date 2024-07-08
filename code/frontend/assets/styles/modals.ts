import { StyleSheet } from "react-native";
import { Colors } from "../constants";

const modal_styles = StyleSheet.create({
    modalContent: {
      height: '90%',
      width: '100%',
      backgroundColor: Colors.black,
      borderTopRightRadius: 18,
      borderTopLeftRadius: 18,
      position: 'absolute',
      bottom: 0,
    },
    titleContainer: {
      height: '5%',
      backgroundColor: Colors.gray,
      borderTopRightRadius: 10,
      borderTopLeftRadius: 10,
      paddingHorizontal: 20,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    title: {
      color: Colors.white,
      fontSize: 16,
    },
});

export default modal_styles;