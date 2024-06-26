import React from "react";
import { StatusBar } from "react-native";
import { Slot } from "expo-router";
import Footer from "./MainFooter";
import Header from "./MainHeader";

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
