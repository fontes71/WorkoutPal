import React from "react";
import { StatusBar, View } from "react-native";
import { Slot } from "expo-router";
import Footer from "./MainFooter";
import Header from "./MainHeader";
import { Colors } from "@/assets/constants";
import layout_styles from "@/assets/styles/layout";

type TabsLayoutOptions = {
  readonly screenName: string
}

function MainTabsLayout({screenName}: TabsLayoutOptions) {
  return (
    <>
      <StatusBar barStyle="dark-content"/>
      <Header isMainScreen={true} screenName={screenName}></Header>
      <Slot></Slot>
      <Footer></Footer>
    </>
  );
};

export default function MainTabsLayoutDarkModeTest({screenName}: TabsLayoutOptions) {
  const styles = layout_styles.generic_styles

  return (
    <View style={{flex: 1, backgroundColor: Colors.black}}>
      <StatusBar backgroundColor={Colors.lightBlack}/>
      <Header isMainScreen={true} screenName={screenName}></Header>
      <View style={styles.children_slot}>
        <Slot></Slot>
      </View>
      <Footer></Footer>
    </View>
  );
};
