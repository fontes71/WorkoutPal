import { Colors } from "@/assets/constants";
import { Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { logout } from "@/services/auth";

export default function MenuScreen() {
    const logoutAction = async () => {
        await logout()
        router.push("/auth/login")
    }

    return (
        <>
            <TouchableOpacity onPress={logoutAction}>
                <Text style={{textAlign: "center", fontSize: 20, marginTop: 15, color: Colors.blue}}>Logout</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push("/progress")}>
                <Text style={{textAlign: "center", fontSize: 20, marginTop: 15, color: Colors.blue}}>Progress</Text>
            </TouchableOpacity>
        </>
    )
}