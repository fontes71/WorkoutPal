import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  quantityContainer: {
    height: 90,
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderColor: "#dadada",
    flexDirection: "row",
  },
  text_small: {
    fontSize: 16,
  },
  modalContent: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderColor: "#000",
    borderWidth: 1,
    height: 150,
    borderRadius: 10
  },
  input: {
    borderColor: 'gray',
    borderRadius: 5,
    borderWidth: 1,
    padding: 10,

  },
  inputsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  buttonsWrapper: {
    flexDirection: 'row',
  },
  exitButton: {
    elevation: 8,
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 12
  },
  saveButton: {
    elevation: 8,
    backgroundColor: '#009688',
    paddingVertical: 10,
    paddingHorizontal: 12
  }
})

export default styles