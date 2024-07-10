import { StyleSheet } from 'react-native'
import { Colors } from "@/assets/styles/common";

const auth_styles = StyleSheet.create({
    main_container: {
        flex: 1,
        marginTop: 0
    },
    show_password_button: {
        alignSelf: "flex-end",
        width: "20%",
        marginTop: -43, 
        paddingRight: 20
    },
    show_password_button_signup: {
        alignSelf: "flex-end",
        width: "20%",
        marginTop: -79, 
        paddingRight: 20
    },
    show_password_icon: {
        alignSelf: "flex-end"
    },
    horizontal_line: { 
        borderBottomColor: Colors.white, 
        borderBottomWidth: 1,
        marginTop: 10
    },
    logo_container: {
        paddingTop: 50,
        backgroundColor: Colors.white,
        paddingBottom: 40
    },
    logo_image_login: {
        width: 238,
        height: 206,
        alignSelf: 'center'
    },
    logo_image_signup: {
        width: 238,
        height: 206,
        alignSelf: 'center'
    },
    login_container: {
        flex: 1,
        paddingHorizontal: 30,
        backgroundColor: '#1F2123',
        justifyContent: 'center',
    },
    text: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'white'
    },
    header_text: {
        marginTop: 20,
        fontSize: 20,
    },
    small_text: {
        marginTop: 12,
        fontSize: 10,
    },
    error_message_container: {
        paddingTop: 10,
        paddingBottom: 20
    },
    error_message: {
        color: "red",
        width: '100%',
        textAlign: 'center', 
        fontSize: 12,
    },
    inputs_container: {
        paddingBottom: 35
    },
    input: {
        backgroundColor: 'white',
        height: 43,
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 20,
        marginBottom: 15,
        borderRadius: 10,
    },
    forgotPassword: {
        fontSize: 10, 
        textAlign: 'right',
        fontWeight: 'bold', 
        color: '#1A74E2',
        marginRight: 10,
    },
    button: {
        backgroundColor: '#1A74E2',
        padding: 10,
        borderRadius: 10,
    },
    buttonText: {
        fontWeight: 'bold', 
        color: 'white',
        textAlign: 'center',
    },
    signupText: {
        fontWeight: 'bold',
        fontSize: 10,
        color: 'white',
        textAlign: 'center',
        marginTop: 10,
    },
    signupLink: {
        color: '#1A74E2',
    },
    other_links_text: {
        marginTop: 35,
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
    },
    icon: {
        marginTop: 10,
        color: '#1A74E2',
        textAlign: 'center'
    }
})

export default auth_styles
  