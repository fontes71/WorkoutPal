import { Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { UNIT_VALUES, display, getInputValue, inputOnChange, onClose } from "./utils";
import styles from "./styles";
import React, { useState } from "react";
import { Dropdown } from 'react-native-element-dropdown';

import PopupModal from "@/assets/components/common/popupModal/PopupModal";
import { StyleSheet } from "react-native";
import DropdownMenu from "@/assets/components/common/dropdownMenu/DropdownMenu";


const Quantity: React.FC<QuantityProps> = ({ quantity, setQuantity }) => {
  const [modalOpen, setModalOpen] = useState(false)

  return( 
  <>
    <QuantityDisplay quantity={quantity} openModal={() => setModalOpen(true)} />
    <QuantityModal modalOpen={modalOpen} closeModal={() => setModalOpen(false)} quantity={quantity} setQuantity={setQuantity}/>
  </>
);
}

const QuantityModal: React.FC<QuantityModalProps> = ({ modalOpen, closeModal, quantity, setQuantity }) => {
  const [currentQuantity, setCurrentQuantity] = useState<CurrentQuantity>(quantity)

  const setUnit = (unit: string) => {
    setCurrentQuantity((prev) => ({ ...prev, unit }));
  };

return (
  <PopupModal
  visible={modalOpen}
  transparent={true}
  closeModal={() => onClose(closeModal, setCurrentQuantity, quantity)}
  margin={"15%"}
 >
  <View style={styles.modalContent}>
    <TextInput
            style={styles.input}
            value={getInputValue(currentQuantity.value)}
            keyboardType="numeric"
            onChangeText={value => inputOnChange(value, currentQuantity, setCurrentQuantity)}
          />
         <DropdownMenu data={UNIT_VALUES} value={currentQuantity.unit} setValue={setUnit}/>

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
