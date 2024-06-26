import React from "react";
import { View, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Link } from "expo-router";
import styles from "@/assets/styles/auth";

export default function ConnectWithGoogleContainerSignup() {
  return (
    <View>
      <Text style={styles.signupText}>
        Don't have an account yet?{" "}
        <Link style={styles.signupLink} href={"/auth/signup/"}>
          Sign Up
        </Link>
      </Text>
      <Text style={[styles.small_text, styles.other_links_text]}>
        Or connect with
      </Text>
      <FontAwesome style={styles.icon} name="google" size={15} />
    </View>
  );
}
