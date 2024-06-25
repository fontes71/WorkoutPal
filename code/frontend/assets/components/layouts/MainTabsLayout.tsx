import React from "react";
import { View, TouchableOpacity, StatusBar, Text, StyleSheet, Image } from "react-native";
import { useRouter, Link, Slot } from "expo-router";
import auth_styles from "@/assets/styles/auth";
import { Colors } from "@/constants";

export default function MainTabsLayout() {
  return (
    <>
      <StatusBar barStyle="dark-content"/>
      <Header></Header>
      <Slot></Slot>
      <Footer></Footer>
    </>
  );
};

const Header = () => {
  const router = useRouter();
  return (
      <View style={styles.header_container}>
          <View style={auth_styles.top_bar_container}>
              <TouchableOpacity style={styles.menu_button} onPress={() => router.push("modals/menu")}> 
                  <Image style={styles.menu_icon} source={require("@images/menu.png")}/>
              </TouchableOpacity>
          </View>
      </View>
  );
};

const Footer = () => {
  return (
      <View style={styles.footer_container}>
        <Link style={styles.link} href="/exercises">
          Exercises
        </Link>
        <Link style={styles.link} href="/food">
          Food
        </Link>
      </View>
  );
};

const styles = StyleSheet.create({
  header_container: {
      backgroundColor: Colors.gray, 
      height: "7%",
      borderRadius: 10,
      marginTop: 6
  },
  footer_container: {
      height: "8%",
      backgroundColor: Colors.gray, 
      borderTopLeftRadius: 20, 
      borderTopRightRadius: 20,
      alignItems: "center"
  },
  menu_button: {
      paddingLeft: 20,
      paddingTop: 8,
      height: "100%",
      justifyContent: "center"
  },
  menu_icon: {
      width: 20,
      height: 25
  },
  link: {
    color: "blue",
    fontSize: 17
  }
})