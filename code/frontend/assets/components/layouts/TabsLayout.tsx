import React from "react";
import { View} from "react-native";
import { Slot } from "expo-router";
import layout_styles from "@/assets/styles/layout";
import Footer from "./MainFooter";
import Header from "./MainHeader";
import { Colors } from "@/assets/constants";
import { StatusBar } from "expo-status-bar";
//import { StatusBar } from "react-native";

type TabsLayoutOptions = {
    readonly screenName: string
}

export default function TabsLayout({screenName}: TabsLayoutOptions) {
    const styles = layout_styles.generic_styles
    return (
        <View style={{flex: 1, backgroundColor: Colors.black}}>
            <StatusBar style="light" backgroundColor={Colors.lightBlack}/>
            <Header isMainScreen={false} screenName={screenName}></Header>
            <View style={styles.children_slot}>
                <Slot />
            </View>
            <Footer />
        </View>
    );
};
