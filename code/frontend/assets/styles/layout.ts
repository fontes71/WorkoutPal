import { StyleSheet } from "react-native"
import { Colors } from "@/constants"

const generic_styles = StyleSheet.create({
    children_slot: {
        flex: 1
    }
})

const footer_styles = StyleSheet.create({
    footer_container: {
        height: "9%",
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
        height: "55%"
    },
    button: {
        alignItems: "center"
    },
    button_icon: {
        width: 25, 
        height: 25
    },
    button_text: {
        color: "black",
        fontWeight: "500",
        fontSize: 15
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
    header_container_dark_mode: {
        borderTopColor: "black",
        backgroundColor: Colors.lightBlack,
        width: "100%",
        height: "9%",
        borderBottomLeftRadius: 7,
        borderBottomRightRadius: 7,
        flexDirection: "row",
    },
    menu_button_container: {
        width: "50%", 
        alignItems: "flex-end",
        justifyContent: "center",
        paddingRight: 8
    },
    menu_button: {
        width: "35%", 
        alignItems: "center"
    }, 
    menu_icon: {
        width: 23,
        height: 28
    },
    back_button_container: {
        width: "50%", 
        alignItems: "center",
        flexDirection: "row",
        paddingLeft: 26
    },
    back_button: {
        width: "25%"
    },
    back_icon: {
        width: 21,
        height: 17
    }
})

const layout_styles = {
    header_styles,
    footer_styles,
    generic_styles
}

export default layout_styles