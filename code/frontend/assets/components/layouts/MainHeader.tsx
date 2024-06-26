import { TouchableOpacity, View, Image, Text } from "react-native";
import layout_styles from "@/assets/styles/layout";
import { useRouter } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { Colors } from "@/constants";

type HeaderOptions = {
    readonly isMainScreen: boolean
}

export default function MainHeader({isMainScreen}: HeaderOptions) {
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
                <TouchableOpacity style={styles.menu_button} onPress={() => router.push("modals/menu")}> 
                    <Image style={styles.menu_icon} source={require("@images/menu.png")}/>
                </TouchableOpacity>
            </View>
        </View>
    );
}

function MainHeaderDarkModeTest({isMainScreen}: HeaderOptions) {
    const router = useRouter()
    const styles = layout_styles.header_styles

    return (
        <View style={styles.header_container_dark_mode}>
            <View style={styles.back_button_container}>
                { !isMainScreen &&
                    <TouchableOpacity style={styles.back_button} onPress={router.back}>
                        <FontAwesome style={styles.back_icon} name="angle-left" />
                    </TouchableOpacity>
                }
                <Text style={{color: Colors.blue, paddingLeft: 26, fontSize: 22, fontWeight: "bold"}} >Exercise</Text>
            </View>
            <View style={styles.menu_button_container}>
                <TouchableOpacity style={styles.menu_button} onPress={() => router.push("modals/menu")}> 
                    <Image style={styles.menu_icon} source={require("@images/menu.png")}/>
                </TouchableOpacity>
            </View>
        </View>
    );
}