import { Colors } from "@/assets/constants";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  absoluteFill: {
    width: 400,
    height: 400,
  },
  button: {
    padding: 20,
    backgroundColor: Colors.blue,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: Colors.white,
    fontWeight: 'bold',
    marginRight: 3
  },
  barcodeImg: {
    marginLeft: 3
  }
});

export default styles;
