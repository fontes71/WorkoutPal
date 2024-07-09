import React from "react";
import { View, StatusBar} from "react-native";
import { Slot } from "expo-router";
import layout_styles from "@/assets/styles/layout";
import Footer from "./MainFooter";
import Header from "./MainHeader";
import { Colors } from "@/assets/styles/common";

type TabsLayoutOptions = {
    readonly screenName: string
}

export default function TabsLayout({screenName}: TabsLayoutOptions) {
    const styles = layout_styles.generic_styles
    return (
        <View style={{flex: 1, backgroundColor: Colors.black}}>
            <StatusBar barStyle="light-content" backgroundColor={Colors.lightBlack}/>
            <Header isMainScreen={false} screenName={screenName}></Header>
            <View style={styles.children_slot}>
                <Slot />
            </View>

        </View>
    );
};
