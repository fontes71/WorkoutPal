import React, { useState } from 'react';
import { View, StatusBar, StyleSheet } from 'react-native';
import PasswordInput from '../utils/components/PasswordInput';

export default function LoginScreen() {
    const [password, setPassword] = useState('')

    return (
        <View style={styles.main_container}>
            <StatusBar barStyle="dark-content" />
            <PasswordInput password={password} setPassword={setPassword}/>
        </View>
    )
}

const styles = StyleSheet.create({
    main_container: {
    }
})