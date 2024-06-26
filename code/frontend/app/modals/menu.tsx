import { Colors } from "@/constants";
import { Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { logout } from "@/services/auth";

export default function MenuScreen() {
    const logoutAction = async () => {
        await logout()
        router.push("/auth/login")
    }

    return (
        // There needs to be a state that is changed after the logout is complete, now it does not wait for logout to be complete
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