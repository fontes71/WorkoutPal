import UserProvider from "@/assets/components/auth/AuthContext";
import { Slot, usePathname } from "expo-router";
import { StatusBar, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AuthLayout from "@/assets/components/layouts/AuthLayout";
import MainTabsLayout from "@/assets/components/layouts/MainTabsLayout";
import TabsLayout from "@/assets/components/layouts/TabsLayout";

const Layout = () => {
  const path = usePathname()
  const layout = getLayout(path)

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar barStyle="dark-content" />
      <UserProvider>
        {layout}
      </UserProvider>
    </SafeAreaView>
  );
};

function getLayout(path: string) {
  const pathArray = path.split("/").slice(1)
  if (pathArray[0] == "auth") return (
    <AuthLayout />
  ) 
  if (pathArray.length == 1) return (
    <MainTabsLayout />
  ) 
  
  return (
    <TabsLayout />
  )
}

export default Layout;
