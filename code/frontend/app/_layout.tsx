import UserProvider from "@/assets/components/auth/AuthContext";
import { usePathname } from "expo-router";
import { StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AuthLayout from "@/assets/components/layouts/AuthLayout";
import MainTabsLayout from "@/assets/components/layouts/MainTabsLayout";
import TabsLayout from "@/assets/components/layouts/TabsLayout";
import { Colors } from "@/assets/constants";

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
  const splitPath = path.split("/")
  console.log(splitPath)
  const screenName = getScreenName(path)
  if (screenName == "Auth") return (
    <AuthLayout />
  ) 
  if (screenName == "Exercises" || screenName == "Nutrition") return (
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
    case "auth": 
      screenName = "Auth"
      break
    case "food":
      screenName = "Nutrition"
      break
    case "exercises": 
      screenName = "Exercises"
      break
    case "progress":
      screenName = "Progress"
      break
  }

  return screenName
}

export default Layout;
