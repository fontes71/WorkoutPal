import { StyleSheet } from "react-native";

const main_styles = StyleSheet.create({
    main_container: {
        flex: 1,
    }
});

const chart_styles = StyleSheet.create({
    chart_container: {
        width: "100%", 
        alignItems: "center",
        marginVertical: 8,
    },
    chart_info: {
        fontSize: 13, 
        position: "absolute", 
        textAlign: "center", 
        width: "100%", 
        marginTop: 10, 
        color: "white", 
        zIndex: 1
    },
    chart: {
        borderRadius: 10, 
        position: "relative"
    }
});

const progress_styles = {
    main_styles,
    chart_styles,
    
}

export default progress_styles