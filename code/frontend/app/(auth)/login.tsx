import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, StatusBar } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Link, useRouter } from "expo-router";
import { localhost } from '@/constants';
import useKeyboardVisibility from '@/assets/hooks/useKeyboardVisibility';
import { useFetch } from '@/assets/hooks/useFetch';

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginPressed, setLoginPressed] = useState(false)
    const [response, setResponse] = useState<Response | undefined>(undefined)

    const router = useRouter()
    const isKeyboardVisible = useKeyboardVisibility();

    const loginAction = async () => {
        setLoginPressed(true)
        const response = await fetch(
            `${localhost}8080/api/login`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "email": email,
                    "password": password 
                }),
            }
        );
        setResponse(response)
        if (response.ok) router.push("/(tabs)/exercise") // more than that needs to be done, especially if there are errors to handle
    }

    return (
        <View style={styles.main_container}>
            <StatusBar barStyle="dark-content" />
            {!isKeyboardVisible && <View style={styles.logo_container}>
                <Image source={require("../../assets/images/workoutpal-full-logo.png")} style={styles.logo_image} />
            </View>}
            <View style={styles.login_container}>
                <Text style={[styles.text, styles.header_text]}>Log In</Text>
                <Text style={[styles.text, styles.small_text]}>Sign In and start getting the most out of our app</Text>
                <View style={styles.inputs_container}>
                    <TextInput
                        style={styles.input}
                        onChangeText={setEmail}
                        value={email}
                        placeholder="Email"
                        keyboardType="email-address"
                        autoCapitalize="none"
                    /> 
                    <TextInput
                        style={styles.input}
                        onChangeText={setPassword}
                        value={password}
                        placeholder="Password"
                        secureTextEntry
                        autoCapitalize="none"
                    />
                    <TouchableOpacity onPress={() => {}}>
                        <Text style={styles.forgotPassword}>Forgot Password</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.button} onPress={loginAction}>
                    {(!loginPressed) ? <Text style={styles.buttonText}>Log In</Text> : <Text style={styles.buttonText}>Loading...</Text>}
                </TouchableOpacity>
                <Text style={styles.signupText}>
                    Don't have an account yet? <Link style={styles.signupLink} href={"/(auth)/signup"}>Sign Up</Link>
                </Text>
                <Text style={[styles.small_text, styles.other_links_text]}>Or connect with</Text>
                <FontAwesome style={styles.icon} name="google" size={15}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    main_container: {
        marginTop: 50
    },
    logo_container: {
        marginBottom: 40
    },
    logo_image: {
        width: 280,
        height: 234,
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
});
  