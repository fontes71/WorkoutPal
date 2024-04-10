import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

interface PasswordInputProps {
    readonly password: string;
    readonly setPassword: React.Dispatch<React.SetStateAction<string>>;
}

// could be a better idea to delete all the default styles on the textinput and create one from 0 and let the icon be on the right of it that way they won't overlap
export default function PasswordInput({password, setPassword}: PasswordInputProps) {
    const [showPassword, setShowPassword] = useState(false)

    return (
        <View style={styles.input_container}>
            <TouchableOpacity style={ styles.show_password_button } onPress={() => setShowPassword(prevShowPassword => !prevShowPassword)}>
                {showPassword ? <FontAwesome style={styles.show_password_icon} name="eye" size={15}/> : <FontAwesome style={styles.show_password_icon} name="eye-slash" size={15}/>}
            </TouchableOpacity>
            <TextInput
                style={styles.input}
                onChangeText={setPassword}
                value={password}
                placeholder="Password"
                secureTextEntry={!showPassword}
                autoCapitalize="none"
            /> 
        </View>
    )
}



const styles = StyleSheet.create({
    main_container: {
        height: '100%',
        justifyContent: 'center',      
    },
    input_container: {
        alignSelf: 'center',
        width: '100%'
    },
    input: {
        width: '100%',
        alignSelf: 'center',
        backgroundColor: 'white',
        height: 43,
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 20,
        marginBottom: 15,
        borderRadius: 10,
    },
    show_password_button: {
        alignSelf: 'flex-end',
        width: '20%',
        zIndex: 1
    },
    show_password_icon: {
        paddingHorizontal: 20,
        paddingVertical: 14,
        position: 'absolute',
        alignSelf: 'flex-end',
    },
})