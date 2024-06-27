import Chart from "@/assets/components/progress/Chart";
import { ScrollView } from "react-native";
import progress_styles from "@/assets/styles/progress";

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
            <Chart title="Workouts" data={data}/>
            <Chart title="Calories" data={data}/>
        </ScrollView>
    )
}