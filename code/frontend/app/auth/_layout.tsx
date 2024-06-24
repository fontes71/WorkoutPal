import React from "react";
import { View, TouchableOpacity, StatusBar, Text, StyleSheet } from "react-native";
import { Slot, useRouter } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import auth_styles from "@/assets/styles/auth";

const Layout = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Header></Header>
      <Slot />
      <Footer></Footer>
    </>
  );
};

const Header = () => {
  return (
    <View style={auth_styles.horizontal_line} />
  );
};

const Footer = () => {
  return (
      <Text>Footer Here</Text>
  );
};

export default Layout;
