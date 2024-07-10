import { Colors } from "@/assets/styles/common";
import { View, Text } from "react-native"

type InvalidChartOptions = {
    readonly message: string
}

export default function InvalidChart({message}: InvalidChartOptions) {
    return (
        <View style={{width: "100%", alignItems: "center", justifyContent: "center", marginVertical: 20}}>
            <Text style={{color: Colors.white, fontSize: 20, width: "90%", borderWidth: 2, borderColor: Colors.blue, padding: 20, borderRadius: 10, backgroundColor: Colors.lightBlack}}>{message}</Text>
        </View>
    )
}