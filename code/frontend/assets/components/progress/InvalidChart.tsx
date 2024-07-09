import { Colors } from "@/assets/styles/common";
import { View, Text } from "react-native"

type InvalidChartOptions = {
    readonly message: string
}

export default function InvalidChart({message}: InvalidChartOptions) {
    return (
        <View style={{width: "100%", alignItems: "center", justifyContent: "center", marginBottom: 20}}>
            <Text style={{fontSize: 20, width: "90%", borderWidth: 2, borderColor: Colors.black, padding: 20}}>{message}</Text>
        </View>
    )
}