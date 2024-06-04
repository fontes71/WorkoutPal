import UserProvider from "@/assets/components/auth/AuthContext";
import { getLocalUser } from "@/assets/functions/auth";
import { User } from "@/domain/auth";
import { Stack } from "expo-router/stack";
import { createContext, useEffect, useState } from "react";



export default function AppLayout() {
  return (
    <UserProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </UserProvider>
  );
}
