import UserProvider from "@/assets/components/auth/AuthContext";
import { usePathname } from "expo-router";
import { StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AuthLayout from "@/assets/components/layouts/AuthLayout";
import MainTabsLayout from "@/assets/components/layouts/MainTabsLayout";
import TabsLayout from "@/assets/components/layouts/TabsLayout";
import { Colors } from "@/assets/styles/common";

const Layout = () => {
  const path = usePathname()
  const layout = getLayout(path)

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.lightBlack}}>
      <StatusBar barStyle="light-content"/>
      <UserProvider>
        {layout}
      </UserProvider>
    </SafeAreaView>
  );
};

function getLayout(path: string) {
  const splitPath = path.split("/").slice(1)
  const screenName = getScreenName(path)
  if (screenName == "Auth") return (
    <AuthLayout />
  ) 
  if (splitPath.length == 1 && (screenName == "Fitness" || screenName == "Nutrition")) return (
    <MainTabsLayout screenName={screenName}/>
  ) 
  return (
    <TabsLayout screenName={screenName}/>
  )
}

function getScreenName(path: string): string {
  const name = path.split("/").slice(1)[0]
  let screenName = ""
  switch (name) {
    case "menu": 
      screenName = "Menu"
      break
    case "food":
      screenName = "Nutrition"
      break
    case "fitness": 
      screenName = "Fitness"
      break
    case "progress":
      screenName = "Progress"
      break
    case "auth": 
      screenName = "Auth"
      break
  }

  return screenName
}

export default Layout;
