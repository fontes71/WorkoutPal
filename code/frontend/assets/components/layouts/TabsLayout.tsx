import React from "react";
import { View, StatusBar } from "react-native";
import { Slot } from "expo-router";
import layout_styles from "@/assets/styles/layout";
import Footer from "./MainFooter";
import Header from "./MainHeader";

export default function TabsLayout() {
    const styles = layout_styles.generic_styles
    return (
        <>
            <StatusBar barStyle="dark-content"/>
            <Header isMainScreen={false} ></Header>
            <View style={styles.children_slot}>
                <Slot />
            </View>
            <Footer />
        </>
    );
};
