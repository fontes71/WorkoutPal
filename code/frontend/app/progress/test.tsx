import { View, Text, TouchableOpacity } from "react-native";

export default function TestScreen() {
    return (
        <>
            <View style={{flex: 1}}>
                <Text>Something</Text>
            </View>

            <View>
                <TouchableOpacity>
                    <Text>Buttons</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}