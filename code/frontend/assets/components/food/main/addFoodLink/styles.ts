import { Colors } from "@/assets/constants";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    link: {
        padding: 20,
        borderBottomWidth: 0.2,
        borderBottomColor: Colors.darkGray,
        textAlign: 'center',
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


