import React from "react";
import { StatusBar, View } from "react-native";
import auth_styles from "@/assets/styles/auth";
import { Slot } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AuthLayout() {
  return (
    <>
        <StatusBar barStyle="dark-content"/>
        <Header />
        <Slot />
    </>
  );
};

const Header = () => {
  return (
    <View style={auth_styles.horizontal_line} />
  );
};
