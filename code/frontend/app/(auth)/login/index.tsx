import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StatusBar } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Link, useRouter } from "expo-router";
import PasswordInput from '@/app/utils/components/PasswordInput';
import { localhost } from '@/constants';
import useKeyboardVisibility from '@/assets/hooks/useKeyboardVisibility';
import auth_styles from '@/assets/styles/auth';

export default function LoginScreen() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [fetching, setFetching] = useState(false)
    const [response, setResponse] = useState<Response | undefined>(undefined)

    const router = useRouter()
    const isKeyboardVisible = useKeyboardVisibility();

    const loginAction = async () => {
        setFetching(true)
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
        )
        setFetching(false)
        setResponse(response)
        if (response.ok) router.push("/(tabs)/exercise") // more than that needs to be done, especially if there are errors to handle
    }

    return (
        <View style={styles.main_container}>
            {!isKeyboardVisible && <View style={styles.logo_container}>
                <Image source={require("../../../assets/images/workoutpal-full-logo.png")} style={styles.logo_image_login} />
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
                    <PasswordInput password={password} setPassword={setPassword}></PasswordInput>
                    
                    <TouchableOpacity onPress={() => {}}>
                        <Text style={styles.forgotPassword}>Forgot Password</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.button} onPress={loginAction}>
                    {(!fetching) ? <Text style={styles.buttonText}>Log In</Text> : <Text style={styles.buttonText}>Loading...</Text>}
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

const styles = auth_styles