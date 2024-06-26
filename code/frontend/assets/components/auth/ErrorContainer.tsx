import React from "react";
import { View, Text } from "react-native";
import styles from "@/assets/styles/auth";

type ErrorInfo = {
  readonly responseError: ResponseError | undefined;
};

export default function ErrorContainer({ responseError }: ErrorInfo) {
  return (
    <View style={styles.error_message_container}>
      {responseError && (
        <Text style={[styles.error_message]}>{responseError.message}</Text>
      )}
    </View>
  );
}
