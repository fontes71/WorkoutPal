import React from 'react';
import { View, Image, StyleProp } from 'react-native';
import useKeyboardVisibility from '@/assets/functions/useKeyboardVisibility';
import { ImageStyle } from 'expo-image';
import styles from '@/assets/styles/auth';

type StyleInfo = {
    readonly imageStyle: StyleProp<ImageStyle>
}

export default function LogoContainer({imageStyle}: StyleInfo) {
    const isKeyboardVisible = useKeyboardVisibility()

    return (
        <View>
            {!isKeyboardVisible && <View style={styles.logo_container}>
                <Image source={require("@/assets/images/workoutpal-full-logo.png")} style={imageStyle} />
            </View>}
        </View>
    )
}