import { StyleSheet } from 'react-native'

const auth_styles = StyleSheet.create({
    main_container: {
        marginTop: 0
    },
    top_bar_container: { 
        width: "100%",
        marginBottom: 10,
    },
    back_button: {
        width: "10%",
    },
    horizontal_line: { 
        borderBottomColor: 'black', 
        borderBottomWidth: 1,
        marginTop: 10
    },
    back_icon: {
        alignSelf: "center",
        marginTop: 10,
        fontSize: 26,
        marginLeft: '5%'
    },
    logo_container: {
        marginBottom: 40
    },
    logo_image_login: {
        width: 280,
        height: 234,
        alignSelf: 'center'
    },
    logo_image_signup: {
        width: 238,
        height: 206,
        alignSelf: 'center'
    },
    login_container: {
        paddingHorizontal: 30,
        height: '100%',
        backgroundColor: '#1F2123'
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
    inputs_container: {
        paddingVertical: 35
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
  