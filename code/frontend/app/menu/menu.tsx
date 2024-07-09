import { Colors } from "@/assets/constants";
import { Text, TouchableOpacity, View, Image } from "react-native";
import { router } from "expo-router";
import { logout } from "@/services/auth";

export default function MenuScreen() {
    const statsIcon = require("@images/stats_blue.png")
    const logoutIcon = require("@images/logout_blue.png")

    const logoutAction = async () => {
        await logout()
        router.push("/auth/login")
    }

    return (
        <View style={{marginTop: 20}}>
            <TouchableOpacity onPress={() => router.push("/progress")}>
                <Item text="Check My Progress" iconPath={statsIcon}></Item>
            </TouchableOpacity>
            <TouchableOpacity onPress={logoutAction}>
                <Item text="Log Out" iconPath={logoutIcon}></Item>
            </TouchableOpacity>
        </View>
    )
}

type ItemOption = {
    readonly text: string,
    readonly iconPath: any
}

function Item({text, iconPath}: ItemOption) {
    const rightArrowIcon = require("@images/right-arrow_blue.png")
    return (
        <View style={{alignItems: "center"}}>
            <View style={{backgroundColor: Colors.lightBlack, height: 70, marginTop: 20, width: "90%", flexDirection: "row", borderRadius: 10}}>
                <View style={{width: "70%", height: "100%", alignItems: "center", flexDirection: "row"}}>
                    <Image style={{width: 18, height: 18, marginHorizontal: 20}} source={rightArrowIcon}/>
                    <Text style={{fontSize: 18, color: Colors.white, fontWeight: "bold"}}>{text}</Text>
                </View>
                <View style={{width: "30%", justifyContent: "center", alignItems: "center"}}>
                    <Image style={{width: 22, height: 22, marginHorizontal: 20}} source={iconPath}/>
                </View>
            </View>
        </View>
        
    )
}