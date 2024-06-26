import React from "react";
import { StatusBar, View } from "react-native";
import { Slot } from "expo-router";
import Footer from "./MainFooter";
import Header from "./MainHeader";
import { Colors } from "@/constants";

export default function MainTabsLayout() {
  return (
    <>
      <StatusBar barStyle="dark-content"/>
      <Header isMainScreen={true} ></Header>
      <Slot></Slot>
      <Footer></Footer>
    </>
  );
};

function MainTabsLayoutDarkModeTest() {
  return (
    <View style={{flex: 1, backgroundColor: Colors.black}}>
      <StatusBar backgroundColor={Colors.lightBlack}/>
      <Header isMainScreen={true} ></Header>
      <Slot></Slot>
      <Footer></Footer>
    </View>
  );
};
