import { StyleSheet } from "react-native"
import { Colors } from "@/constants"

const generic_styles = StyleSheet.create({
    children_slot: {
        flex: 1
    }
})

const footer_styles = StyleSheet.create({
    footer_container: {
        height: "8%",
        backgroundColor: Colors.gray, 
        borderTopLeftRadius: 20, 
        borderTopRightRadius: 20,
        alignItems: "center",
        flexDirection: "row"
    },
    vertical_line: { 
        width: 1,
        height: '74%', 
        backgroundColor: 'black' 
    },
    button_container: {
        width: "50%", 
        height: "60%"
    },
    button: {
        alignItems: "center"
    },
    button_icon: {
        width: 20, 
        height: 20
    },
    button_text: {
        color: "black"
    },
    link: {
        color: "blue",
        fontSize: 17
    }
})

const header_styles = StyleSheet.create({
    header_container: {
        width: "100%",
        backgroundColor: Colors.gray, 
        height: "7%",
        borderRadius: 10,
        marginTop: 6,
        flexDirection: "row",
    },
    menu_button_container: {
        width: "50%", 
        alignItems: "flex-end",
        justifyContent: "center"
    },
    menu_button: {
        width: "35%", 
        alignItems: "center"
    }, 
    menu_icon: {
        width: 20,
        height: 25
    },
    back_button_container: {
        width: "50%", 
        justifyContent: "center"
    },
    back_button: {
        width: "26%", 
        alignItems: "center"
    },
    back_icon: {
        fontSize: 26,
    }
})

const layout_styles = {
    header_styles,
    footer_styles,
    generic_styles
}

export default layout_styles