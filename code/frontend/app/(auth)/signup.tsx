import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StatusBar } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Link, useRouter } from "expo-router";
import PasswordInput from '@/app/utils/components/PasswordInput';
import { localhost } from '@/constants';
import useKeyboardVisibility from '@/assets/hooks/useKeyboardVisibility';
import auth_styles from '@/assets/styles/auth';

export default function LoginScreen() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [fetching, setFetching] = useState(false)
    const [response, setResponse] = useState<Response | undefined>(undefined)

    const router = useRouter()
    const isKeyboardVisible = useKeyboardVisibility()

    const signupAction = async () => {
        setFetching(true)
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
        )
        setFetching(false)
        setResponse(response)
        if (response.status == 201) router.push("/(tabs)/exercise")
    }

    return (
        <View style={styles.main_container}>
            <StatusBar barStyle="dark-content" />
            <View style={styles.horizontal_line} />
            <View style = { styles.top_bar_container }>
                <TouchableOpacity style={styles.back_button} onPress={router.back}>
                <FontAwesome style={styles.back_icon} name="angle-left"/> 
                </TouchableOpacity>
            </View>
            {!isKeyboardVisible && <View style={styles.logo_container}>
                <Image source={require("../../assets/images/workoutpal-full-logo.png")} style={styles.logo_image_signup} />
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
                    <PasswordInput password={password} setPassword={setPassword}></PasswordInput>
                </View>

                <TouchableOpacity style={styles.button} onPress={signupAction}>
                    {(!fetching) ? <Text style={styles.buttonText}>Sign Up</Text> : <Text style={styles.buttonText}>Loading...</Text>}
                </TouchableOpacity>
                <Text style={styles.signupText}>
                    Already have an account? <Link style={styles.signupLink} href={"/(auth)/login"}>Log In</Link>
                </Text>
                <Text style={[styles.small_text, styles.other_links_text]}>Or connect with</Text>
                <FontAwesome style={styles.icon} name="google" size={15}/>
            </View>
        </View>
    )
}

const styles = auth_styles