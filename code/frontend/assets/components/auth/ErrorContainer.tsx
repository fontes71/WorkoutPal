import React from "react";
import { View, Text } from "react-native";
import { ResponseError } from "@/domain/auth";
import styles from "@/utils/styles/auth";

type ErrorInfo = {
  readonly responseError: ResponseError | undefined;
};

export default function ErrorContainer({ responseError }: ErrorInfo) {
  return (
    <View style={styles.error_message_container}>
      {responseError && (
        <Text style={styles.error_message}>{responseError.error_message}</Text>
      )}
    </View>
  );
}
