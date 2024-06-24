import React from "react";
import { View, TouchableOpacity, StatusBar, Text, StyleSheet } from "react-native";
import { Slot, useRouter } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import auth_styles from "@/assets/styles/auth";
import { Colors } from "@/constants";

const Layout = () => {
  return (
    <>
        <StatusBar barStyle="dark-content"/>
        <Header></Header>
        <View style={styles.children_slot}>
            <Slot />
        </View>
        <Footer></Footer>
    </>
  );
};

const Header = () => {
    const router = useRouter();
    return (
        <View style={styles.header_container}>
            <View style={auth_styles.top_bar_container}>
                <TouchableOpacity style={auth_styles.back_button} onPress={router.back}>
                    <FontAwesome style={auth_styles.back_icon} name="angle-left" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const Footer = () => {
    return (
        <View style={styles.footer_container}>
          <Text style={{height: "100%", textAlignVertical: "center", textAlign: "center"}}>Footer Here</Text>  
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
    },
    children_slot: {
        flex: 1,
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
    }
})

export default Layout;
