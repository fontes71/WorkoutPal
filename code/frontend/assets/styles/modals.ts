import { StyleSheet } from "react-native";

const modal_styles = StyleSheet.create({
    modalContent: {
      height: '90%',
      width: '100%',
      backgroundColor: '#25292e',
      borderTopRightRadius: 18,
      borderTopLeftRadius: 18,
      position: 'absolute',
      bottom: 0,
    },
    titleContainer: {
      height: '5%',
      backgroundColor: '#464C55',
      borderTopRightRadius: 10,
      borderTopLeftRadius: 10,
      paddingHorizontal: 20,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    title: {
      color: '#fff',
      fontSize: 16,
    },
});

export default modal_styles;