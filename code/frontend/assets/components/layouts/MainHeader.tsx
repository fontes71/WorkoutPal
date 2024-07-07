import { TouchableOpacity, View, Image, Text } from "react-native";
import layout_styles from "@/assets/styles/layout";
import { useRouter } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { Colors } from "@/constants";

type HeaderOptions = {
    readonly isMainScreen: boolean,
    readonly screenName: string
}

function MainHeader({isMainScreen}: HeaderOptions) {
    const router = useRouter()
    const styles = layout_styles.header_styles

    return (
        <View style={styles.header_container}>
            <View style={styles.back_button_container}>
                { !isMainScreen &&
                    <TouchableOpacity style={styles.back_button} onPress={router.back}>
                        <FontAwesome style={styles.back_icon} name="angle-left" />
                    </TouchableOpacity>
                }
            </View>
            <View style={styles.menu_button_container}>
                <TouchableOpacity style={styles.menu_button} onPress={() => router.push("/menu/menu")}> 
                    <Image style={styles.menu_icon} source={require("@images/menu.png")}/>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default function MainHeaderDarkModeTest({isMainScreen, screenName}: HeaderOptions) {
    const router = useRouter()
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
                <TouchableOpacity style={styles.menu_button} onPress={() => router.push("menu/menu")}> 
                    <Image style={styles.menu_icon} source={require("@images/menu_blue.png")}/>
                </TouchableOpacity>
            </View>
        </View>
    );
}