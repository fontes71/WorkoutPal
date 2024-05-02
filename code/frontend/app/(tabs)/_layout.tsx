import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Stack, Tabs, usePathname } from "expo-router";
import { Pressable, StatusBar } from "react-native";

import { Colors } from "@/constants";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useColorScheme } from "@/components/useColorScheme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();


  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
          tabBarStyle: {
            display: usePathname() === "/food/search-food" ? "none" : "flex",
          },
          // Disable the static render of the header on web
          // to prevent a hydration error in React Navigation v6.
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Exercise",
            tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
            headerRight: () => (
              <Link href="/modal" asChild>
                <Pressable>
                  {({ pressed }) => (
                    <FontAwesome
                      name="info-circle"
                      size={25}
                      color={Colors[colorScheme ?? "light"].text}
                      style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                    />
                  )}
                </Pressable>
              </Link>
            ),
          }}
        />
        <Tabs.Screen
          // Name of the route to hide.
          name="exercise"
          options={{
            // This tab will no longer show up in the tab bar.
            href: null,
          }}
        />
        <Tabs.Screen
          // Name of the route to hide.
          name="(auth)"
          options={{
            // This tab will no longer show up in the tab bar.
            href: null,
          }}
        />
        <Tabs.Screen
          name="food"
          options={{
            title: "Food",
            tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
            headerRight: () => (
              <Link href="/modal" asChild>
                <Pressable>
                  {({ pressed }) => (
                    <FontAwesome
                      name="info-circle"
                      size={25}
                      color={Colors[colorScheme ?? "light"].text}
                      style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                    />
                  )}
                </Pressable>
              </Link>
            ),
          }}
        />
      </Tabs>
    </>
  );
}
