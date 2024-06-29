import { Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { display } from "./utils";
import styles from "./styles";
import { useState } from "react";

import PopupModal from "@/assets/components/common/popupModal/PopupModal";
import { StyleSheet } from "react-native";




const Quantity: React.FC<QuantityProps> = ({ quantity, setQuantity }) => {
  const [modalOpen, setModalOpen] = useState(false)

  return( 
  <>
    <QuantityDisplay quantity={quantity} openModal={() => setModalOpen(true)} />
    <QuantityModal modalOpen={modalOpen} closeModal={() => setModalOpen(false)} quantity={quantity} setQuantity={setQuantity}/>
  </>
);
}

const inputOnChange = (value:string, currentQuantity: CurrentQuantity, setCurrentQuantity: React.Dispatch<React.SetStateAction<CurrentQuantity>> ) => {
  const newValue = value && value.length > 0 ? parseInt(value) : null

  setCurrentQuantity({ ...currentQuantity, value: newValue })

}

const getInputValue = (value: number | null) => value != null ? `${value}` : ``


const QuantityModal: React.FC<QuantityModalProps> = ({ modalOpen, closeModal, quantity, setQuantity }) => {
  const [currentQuantity, setCurrentQuantity] = useState<CurrentQuantity>(quantity)

return (
  <PopupModal
  visible={modalOpen}
  transparent={true}
  closeModal={closeModal}
  margin={"15%"}
 >
  <View style={styles.modalContent}>
  <TextInput
          style={styles.input}
          placeholder={ `${quantity.value}`}
          value={getInputValue(currentQuantity.value)}
          keyboardType="numeric"
          onChangeText={value => inputOnChange(value, currentQuantity, setCurrentQuantity)}
        />
  </View>
 </PopupModal>
)
}
 

const QuantityDisplay: React.FC<QuantityDisplayProps> = ({ quantity, openModal }) => (
  <View style={styles.quantityContainer}>
    <TouchableOpacity onPress={openModal}>
      <Text style={styles.text_small}>{display(quantity.value)}{quantity.unit}</Text>
    </TouchableOpacity>
  </View>
);

export default Quantity;
