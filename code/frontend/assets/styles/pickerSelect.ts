import { StyleSheet } from "react-native";
import { Colors } from "@/assets/styles/common";

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: Colors.gray,
    borderRadius: 4,
    color: Colors.white,
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: Colors.white,
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

export default pickerSelectStyles;