import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

interface PasswordInputProps {
    readonly password: string;
    readonly setPassword: React.Dispatch<React.SetStateAction<string>>;
}

export default function PasswordInput({password, setPassword}: PasswordInputProps) {
    const [showPassword, setShowPassword] = useState(false)

    return (
        <View style={styles.input_container}>
            <TextInput
                style={styles.input}
                onChangeText={setPassword}
                value={password}
                placeholder="Password"
                secureTextEntry={!showPassword}
                autoCapitalize="none"
            /> 
            <TouchableOpacity style={ styles.show_password_button } onPress={() => setShowPassword(prevShowPassword => !prevShowPassword)}>
                    {showPassword ? <FontAwesome style={styles.show_password_icon} name="eye" size={15}/> : <FontAwesome style={styles.show_password_icon} name="eye-slash" size={15}/>}     
            </TouchableOpacity>
        </View>
    )
}



const styles = StyleSheet.create({
    input_container: {
        backgroundColor: 'white',
        flexDirection: 'row',
        borderRadius: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: 'gray',
        paddingHorizontal: 20,
    },
    input: {
        width: '93%',
        height: 41,
    },
    show_password_button: {
        height: '100%',
        flexDirection: 'row'
    },
    show_password_icon: {
        alignSelf: 'center'
    },
})