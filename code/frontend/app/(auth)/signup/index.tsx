import React, { useState, Dispatch, SetStateAction } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from "expo-router";
import PasswordInput from '@/app/utils/components/PasswordInput';
import auth_styles from '@/assets/styles/auth';
import { ResponseError, login, signup } from '@/domain/auth';
import LogoContainer from '@/app/utils/components/auth/LogoContainer';
import ErrorContainer from '@/app/utils/components/auth/ErrorContainer';
import ConnectWithGoogleContainer from '@/app/utils/components/auth/ConnectWithGoogleContainer';

type InputInfo = {
    readonly name: string,
    readonly setName: Dispatch<SetStateAction<string>>,
    readonly email: string,
    readonly setEmail: Dispatch<SetStateAction<string>>,
    readonly password: string,
    readonly setPassword: Dispatch<SetStateAction<string>>
}

type ButtonInfo = {
    readonly setResponseError: Dispatch<SetStateAction<ResponseError | undefined>>
    readonly name: string,
    readonly email: string,
    readonly password: string
}

function SignupScreen() {
    return (
        <View style={styles.main_container}>
            <LogoContainer imageStyle={styles.logo_image_signup}/>
            <SignupContainer />
        </View>
    )
}

function SignupContainer() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [responseError, setResponseError] = useState<ResponseError | undefined>(undefined)

    return (
        <View style={styles.login_container}>
            <SignupHeader/>

            <ErrorContainer responseError={responseError}/>
            <InputsContainer name={name} setName={setName} email={email} setEmail={setEmail} password={password} setPassword={setPassword}/>    
            <SingupButton setResponseError={setResponseError} name={name} email={email} password={password}/>

            <ConnectWithGoogleContainer />
        </View>
    )
}

function SignupHeader() {
    return (
        <View>
            <Text style={[styles.text, styles.header_text]}>Sign Up</Text>
            <Text style={[styles.text, styles.small_text]}>Fill the details and create your account now</Text>
        </View>
    )
}

function InputsContainer({name, setName, email, setEmail, password, setPassword}: InputInfo) {
    return (
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
    )
}

function SingupButton({setResponseError, name, email, password}: ButtonInfo) {
    const [fetching, setFetching] = useState(false)
    const router = useRouter()

    const signupAction = async () => {
        setFetching(true)
        const response = await signup(name, email, password)

        if (response.ok) {
            await new Promise(resolve => setTimeout(resolve, 1000))
            await login(email, password)
            router.push("/(tabs)/exercise") 
        } else {
            const body: ResponseError = await response.json()
            setResponseError(body)
        }
        setFetching(false)
    }

    return (
        <TouchableOpacity style={styles.button} onPress={signupAction}>
            {(!fetching) ? <Text style={styles.buttonText}>Sign Up</Text> : <Text style={styles.buttonText}>Loading...</Text>}
        </TouchableOpacity>
    )
}

export default SignupScreen

const styles = auth_styles