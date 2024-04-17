import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Link, useRouter } from "expo-router";
import PasswordInput from '@/app/utils/components/PasswordInput';
import { localhost } from '@/constants';
import useKeyboardVisibility from '@/assets/hooks/useKeyboardVisibility';
import auth_styles from '@/assets/styles/auth';
import { ResponseError } from '@/domain/types';

type ErrorInfo = {
    readonly responseError: ResponseError | undefined
}

type InputInfo = {
    readonly email: string,
    readonly setEmail: React.Dispatch<React.SetStateAction<string>>,
    readonly password: string,
    readonly setPassword: React.Dispatch<React.SetStateAction<string>>
}

type ButtonInfo = {
    readonly setResponseError: React.Dispatch<React.SetStateAction<ResponseError | undefined>>
    readonly email: string,
    readonly password: string
}

function LoginScreen() {
    return (
        <View style={styles.main_container}>
            <LogoContainer />
            <LoginContainer />
        </View>
    )
}

function LogoContainer() {
    const isKeyboardVisible = useKeyboardVisibility()

    return (
        <View>
            {!isKeyboardVisible && <View style={styles.logo_container}>
                <Image source={require("@images/workoutpal-full-logo.png")} style={styles.logo_image_login} />
            </View>}
        </View>
    )
}

function LoginContainer() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [responseError, setResponseError] = useState<ResponseError | undefined>(undefined)

    return (
        <View style={styles.login_container}>
            <LoginHeader />

            <ErrorContainer responseError={responseError}/>
            <InputsContainer email={email} setEmail={setEmail} password={password} setPassword={setPassword}/>    
            <LoginButton setResponseError={setResponseError} email={email} password={password}/>

            <ConnectWithGoogleContainer />
        </View>
    )
}

function LoginHeader() {
    return (
        <View>
            <Text style={[styles.text, styles.header_text]}>Log In</Text>
            <Text style={[styles.text, styles.small_text]}>Sign In and start getting the most out of our app</Text>
        </View>
    )
}

function ErrorContainer({responseError}: ErrorInfo) {
    return (
        <View style={styles.error_message_container}>
            {responseError && <Text style={styles.error_message}>{responseError.error_message}</Text>}
        </View>
    )
}

function InputsContainer({email, setEmail, password, setPassword}: InputInfo) {
    return (
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
        </View>
    )
}

function LoginButton({setResponseError, email, password}: ButtonInfo) {
    const [fetching, setFetching] = useState(false)
    const router = useRouter()

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
        if (response.ok) router.push("/(tabs)/exercise") 
        else {
            const body: ResponseError = await response.json()
            setResponseError(body)
        }
    }

    return (
        <TouchableOpacity style={styles.button} onPress={loginAction}>
            {(!fetching) ? <Text style={styles.buttonText}>Log In</Text> : <Text style={styles.buttonText}>Loading...</Text>}
        </TouchableOpacity>
    )
}

function ConnectWithGoogleContainer() {
    return (
        <View>
            <Text style={styles.signupText}>
                Already have an account? <Link style={styles.signupLink} href={"/(auth)/signup"}>Sign Up</Link>
            </Text>
            <Text style={[styles.small_text, styles.other_links_text]}>Or connect with</Text>
            <FontAwesome style={styles.icon} name="google" size={15}/>  
        </View>
    )
}

export default LoginScreen

const styles = auth_styles