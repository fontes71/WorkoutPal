import UserProvider from "@/assets/components/auth/AuthContext";
import { Slot } from "expo-router";

const Layout = () => {
  return (
    <>
      <UserProvider>
        <Slot />
      </UserProvider>
    </>
  );
};

export default Layout;
