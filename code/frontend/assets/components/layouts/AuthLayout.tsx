import React from "react";
import { StatusBar, View } from "react-native";
import auth_styles from "@/assets/styles/auth";
import { Slot } from "expo-router";

export default function AuthLayout() {
  return (
    <>
        <StatusBar barStyle="light-content"/>
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
