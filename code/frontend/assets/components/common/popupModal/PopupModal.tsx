import styles from "./styles";
import { Modal, TouchableWithoutFeedback, View } from "react-native";
import { PopupModalProps } from "./types";




const PopupModal: React.FC<PopupModalProps> = ({ children, visible, transparent, closeModal, margin }) => (
      <Modal
        visible={visible}
        transparent={transparent}
        onRequestClose={closeModal}
      >
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>
  
        <View 
          style={{
            ...styles.modalContainer,
            margin: margin
          }}
        >
          {children}
        </View>
      </Modal>

)

export default PopupModal