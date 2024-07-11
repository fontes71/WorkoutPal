import { Colors } from "@/assets/styles/common";
import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  quantityContainer: {
    height: 90,
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderColor: Colors.darkGray,
    flexDirection: "row",
  },
  text_small: {
    fontSize: 16,
    color: Colors.blue
  },
  modalContent: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.lightBlack,
    borderColor: Colors.white,
    borderWidth: 0.2,
    height: 150,
    borderRadius: 10
  },
  input: {
    color: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.white,
    fontSize: 15,
    width:55,
    marginRight: 10

  },
  inputsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  buttonsWrapper: {
    flexDirection: 'row',
    marginTop: 20
  },
  exitButton: {
    elevation: 8,
    backgroundColor: Colors.white,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginRight: 8,
    borderRadius: 8,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center'
  },
  saveButton: {
    elevation: 8,
    backgroundColor: Colors.blue,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginLeft: 8,
    borderRadius: 8,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center'
  },
  saveButtonText: {
    color: Colors.white,
  }
})

export default styles