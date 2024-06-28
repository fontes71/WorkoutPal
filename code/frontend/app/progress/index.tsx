import Chart from "@/assets/components/progress/Chart";
import { ScrollView, TouchableOpacity, Text, View } from "react-native";
import progress_styles from "@/assets/styles/progress";
import { Colors } from "@/constants";

const styles = progress_styles.main_styles

export default function ProgressScreen() {
    const data = {
        labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"] as any,
        datasets: [
            {
                data: [80, 76, 65, 70, null, 58, 64, 63, 65, 68, 65, 72] as any,
            }
        ]
    };

    return (
        <ScrollView style={styles.main_container}>
            <Chart title="Weight" data={data}/>
            <View style={{width: "100%", alignItems: "center"}}>
                <TouchableOpacity style={{height: 50, width: "50%", marginBottom: 10}}>
                    <Text style={{backgroundColor: Colors.lightBlue, width: "100%", alignSelf: "center", textAlign: "center", height: 50, textAlignVertical: "center", borderRadius: 12}}>
                        Update weight
                    </Text>
                </TouchableOpacity>
            </View>
            
            <Chart title="Workouts" data={data}/>
            <Chart title="Calories" data={data}/>
            
        </ScrollView>
    )
}