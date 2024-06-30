import { Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { getInputValue, handleSubmit, inputOnChange, onClose } from "./utils";
import styles from "./styles";
import React, { useState } from "react";
import PopupModal from "@/assets/components/common/popupModal/PopupModal";
import DropdownMenu from "@/assets/components/common/dropdownMenu/DropdownMenu";
import UNIT_VALUES  from "@/assets/contants/unitValues";


const Quantity: React.FC<QuantityProps> = ({ quantity, updateQuantity }) => {
  const [modalOpen, setModalOpen] = useState(false)

  return( 
  <>
    <QuantityDisplay quantity={quantity} openModal={() => setModalOpen(true)} />
    <QuantityModal modalOpen={modalOpen} closeModal={() => setModalOpen(false)} quantity={quantity} updateQuantity={updateQuantity}/>
  </>
);
}

const QuantityModal: React.FC<QuantityModalProps> = ({ modalOpen, closeModal, quantity, updateQuantity }) => {
  const [currentQuantity, setCurrentQuantity] = useState<CurrentQuantity>(quantity)

return (
  <PopupModal
  visible={modalOpen}
  transparent={true}
  closeModal={() => onClose(closeModal, setCurrentQuantity, quantity)}
  margin={"15%"}
 >
  <View style={styles.modalContent}>
  <Inputs currentQuantity={currentQuantity} setCurrentQuantity={setCurrentQuantity} />
  <Buttons closeModal={closeModal} handleSubmit={() => handleSubmit(currentQuantity, updateQuantity, closeModal)}/>
  </View>
 </PopupModal>
)
}

const Inputs: React.FC<InputsProps> = ({ currentQuantity, setCurrentQuantity }) => {

  const setUnit = (unit: string) => {
    setCurrentQuantity((prev) => ({ ...prev, unit }));
  };
  
  return (
  <View style={styles.inputsWrapper}>
      <TextInput
              style={styles.input}
              value={getInputValue(currentQuantity.value)}
              keyboardType="numeric"
              onChangeText={value => inputOnChange(value, currentQuantity, setCurrentQuantity)}
            />
      <DropdownMenu data={UNIT_VALUES} value={currentQuantity.unit} setValue={setUnit}/>
    </View>
  )
}

const Buttons: React.FC<ButtonsProps> = ({ closeModal, handleSubmit }) => (
  <View style={styles.buttonsWrapper}>
    <TouchableOpacity onPress={closeModal} style={styles.exitButton}>
      <Text>Exit</Text>
      </TouchableOpacity>
    <TouchableOpacity onPress={handleSubmit} style={styles.saveButton}>
       <Text>Save</Text>
       </TouchableOpacity>
  </View>
)

const QuantityDisplay: React.FC<QuantityDisplayProps> = ({ quantity, openModal }) => (
  <View style={styles.quantityContainer}>
    <TouchableOpacity onPress={openModal}>
      <Text style={styles.text_small}>{quantity.value}{quantity.unit}</Text>
    </TouchableOpacity>
  </View>
);

export default Quantity;
