import { Colors } from "@/constants";
import { View } from "react-native";
import Spinner from 'react-native-loading-spinner-overlay';

export default function Fetching() {
    return (
        <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
            <Spinner
                visible={true} // Set to true when you want to show the spinner
                textContent={'Loading...'} // Optional loading text
                textStyle={{ color: Colors.blue }} // Customize the text style
                color={Colors.blue}
            />
        </View>
    )
}