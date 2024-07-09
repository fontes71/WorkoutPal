import { Colors } from "@/assets/constants";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      padding: 20,
      borderBottomWidth: 0.2,
      borderBottomColor: Colors.darkGray,
      alignItems: 'center',
    },
    link: {
      borderBottomColor: Colors.darkGray,
    },
    wrapper: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    text: {
      color: Colors.white,
      marginRight: 3
    },
    image: {
      marginLeft: 3
    }
});

export default styles;


