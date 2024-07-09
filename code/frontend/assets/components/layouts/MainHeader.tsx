import { TouchableOpacity, View, Image, Text } from "react-native";
import layout_styles from "@/assets/styles/layout";
import { useRouter, usePathname } from "expo-router";
import { Colors } from "@/assets/constants";

type HeaderOptions = {
    readonly isMainScreen: boolean,
    readonly screenName: string
}

export default function MainHeader({isMainScreen, screenName}: HeaderOptions) {
    const router = useRouter()
    const path = usePathname()
    const styles = layout_styles.header_styles

    return (
        <View style={styles.header_container_dark_mode}>
            <View style={[styles.back_button_container]}>
                { !isMainScreen &&
                    <TouchableOpacity style={styles.back_button} onPress={router.back}>
                        <Image style={styles.back_icon} source={require("@images/arrow_blue.png")}/>
                    </TouchableOpacity>
                }
                <Text style={{color: Colors.white, fontSize: 22, fontWeight: "bold", paddingLeft: 5}} >{screenName}</Text>
            </View>
            <View style={styles.menu_button_container}>
                { !isMenuScreen(path) &&
                    <TouchableOpacity style={styles.menu_button} onPress={() => router.push("menu/menu")}> 
                        <Image style={styles.menu_icon} source={require("@images/menu_blue.png")}/>
                    </TouchableOpacity>
                }
            </View>
        </View>
    );
}

function isMenuScreen(path: string): boolean {
    const splitPath = path.split("/").slice(1)
    return splitPath[0] == "menu"
} 