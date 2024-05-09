import React from "react";
import { View, TouchableOpacity, StatusBar } from "react-native";
import { Slot, useRouter } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import auth_styles from "@/utils/styles/auth";

const Layout = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Header />
      <Slot />
    </>
  );
};

const Header = () => {
  const router = useRouter();

  return (
    <>
      <View style={auth_styles.horizontal_line} />
      <View style={auth_styles.top_bar_container}>
        <TouchableOpacity style={auth_styles.back_button} onPress={router.back}>
          <FontAwesome style={auth_styles.back_icon} name="angle-left" />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Layout;
