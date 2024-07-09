import { View, Text, TouchableOpacity, TextInput } from "react-native"
import { Colors } from "@/assets/styles/common";
import { useContext, useState } from "react"
import { UserContext } from "../auth/AuthContext";
import { updateWeight } from "@/services/progress";

export default function UpdateWeight() {
    const { userContext } = useContext(UserContext);
    const [fetching, setFetching] = useState(false)
    const [value, setValue] = useState<string | null>(null)
    const token = userContext?.token

    const updateWeightAction = async () => {
        setFetching(true)
        if (value && token) {
            const newWeight = parseFloat(value)
            if (isNaN(newWeight)) alert("Weight needs to be a number")
            else {
                await updateWeight(newWeight, token)
                alert(`Weight successfully updated to ${newWeight}`)
            }
        } else alert("Invalid weight")
        setFetching(false)
    }

    return (
        <View style={{flexDirection: "row", backgroundColor: Colors.lightBlack, width: "90%", justifyContent: "center", alignSelf: "center", height: "8%", borderRadius: 12, marginBottom: 20}}>
            <View style={{width: "60%", flexDirection: "row", height: "100%", alignItems: "center"}}>
                <Text style={{fontSize: 18, marginLeft: 20, marginRight: 10, color: Colors.white}}>Update Weight</Text>
                <TextInput 
                    style={{borderRadius: 8, paddingHorizontal: 10, backgroundColor: Colors.gray, width: 60, height: 35, fontSize: 18}}
                    keyboardType="numbers-and-punctuation"
                    onChangeText={(text) => setValue(text)}
                    placeholder="kg"
                />
            </View>
            <View style={{width: "40%", alignItems: "flex-end", justifyContent: "center"}}>
                <TouchableOpacity disabled={fetching} onPress={updateWeightAction} style={{marginRight: 20, borderRadius: 10, width: "60%", height: 35, paddingHorizontal: 10, backgroundColor: Colors.lightBlue, justifyContent: "center", alignItems: "center"}}>
                    <Text style={{fontSize: 18, color: Colors.white}}>{!fetching ? "Update" : "..."}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}