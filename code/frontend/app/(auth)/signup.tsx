import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, StatusBar } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Link, useRouter } from "expo-router";
import { localhost } from '@/constants';
import useKeyboardVisibility from '@/assets/hooks/useKeyboardVisibility';

export default function LoginScreen() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [signupPressed, setSignupPressed] = useState(false)
    const [response, setResponse] = useState<Response | undefined>(undefined)

    const router = useRouter()
    const isKeyboardVisible = useKeyboardVisibility()

    const signupAction = async () => {
        setSignupPressed(true)
        const response = await fetch(
            `${localhost}8080/api/signup`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "username": name,
                    "email": email,
                    "password": password 
                }),
            }
        );

        setResponse(response)
        if (response.status == 201) router.push("/(tabs)/exercise")
    }

    return (
        <View style={styles.main_container}>
            <StatusBar barStyle="dark-content" />
            {!isKeyboardVisible && <View style={styles.logo_container}>
                <Image source={require("../../assets/images/workoutpal-full-logo.png")} style={styles.logo_image} />
            </View>}
            <View style={styles.login_container}>
                <Text style={[styles.text, styles.header_text]}>Sign Up</Text>
                <Text style={[styles.text, styles.small_text]}>Fill the details and create your account now</Text>
                <View style={styles.inputs_container}>
                    <TextInput
                        style={styles.input}
                        onChangeText={setName}
                        value={name}
                        placeholder="Name"
                    />
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
                </View>
                <TouchableOpacity style={styles.button} onPress={signupAction}>
                    {(!signupPressed) ? <Text style={styles.buttonText}>Sign Up</Text> : <Text style={styles.buttonText}>Loading...</Text>}
                </TouchableOpacity>
                <Text style={styles.signupText}>
                    Already have an account?  <Link style={styles.signupLink} href={"/(auth)/login"}>Log In</Link>
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
  