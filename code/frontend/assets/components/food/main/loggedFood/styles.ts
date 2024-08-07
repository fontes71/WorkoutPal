import { Colors } from "@/assets/styles/common";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    logContainer: {
        padding: 20,
        borderBottomWidth: 0.2,
        borderBottomColor: Colors.darkGray,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    logName: {
        color: Colors.white,
        marginBottom: 4
    },
    logQuantity: {
        color: Colors.darkGray,
        marginTop: 4,
    },
    logCalories: {
        color: Colors.darkGray,
    },
    container: {
        flex: 1
    }
});

export default styles;

