import { Colors } from "@/constants"
import { useState } from "react"
import { View, Text, Dimensions } from "react-native"
import { LineChart } from "react-native-chart-kit"
import progress_styles from "@/assets/styles/progress"

type ChartOptions = {
    readonly title: string,
    readonly labels: any, // maybe string[]
    readonly dataset: any, // maybe number[]
    readonly suffix: string,
    readonly days: string[]
}

type DotInfo = {
    pressedValue?: number,
    selectedDotIndex: number
}

const styles = progress_styles.chart_styles

export default function Chart({title, dataset, labels, suffix, days}: ChartOptions) {
    const [dotInfo, setDotInfo] = useState<DotInfo>({selectedDotIndex: 0})
    /*const data = {
        labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"] as any,
        datasets: [
            {
                data: [80, 76, 65, 70, null, 58, 64, 63, 65, 68, 65, 72] as any,
            }
        ]
    };
    const toHide: Array<number> = [];
    (dataset as Array<number>).forEach((v, idx) => {if (!v) toHide.push(idx)})
    hidePointsAtIndex={toHide} as LineChart property
*/
    const data = {
        labels: labels,
        datasets: [
            {
                data: dataset,
            }
        ],
        legend: [`${title} | (${days.at(dotInfo.selectedDotIndex)}) ${dotInfo.pressedValue ? `${dotInfo.pressedValue} ${suffix}` : ""}`],
    }

    const chartConfig = {
        legend: true,
        backgroundGradientFrom: Colors.lightBlack,
        backgroundGradientTo: Colors.black,
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,

        decimalPlaces: 0,
        strokeWidth: 2,
        useShadowColorFromDataset: false, 
        
        style: {
            paddingTop: 16
        },
        legendFontSize: 20
    };

    const handleDataPointClick = (data: any) => {
        setDotInfo({
            pressedValue: data.value,
            selectedDotIndex: data.index
        })
    };

    const getDotColor = (dataPoint: number, dataPointIndex: number) => {
        if (dotInfo.selectedDotIndex == dataPointIndex) return Colors.green;
        else return Colors.white
    };
    
    return(
        <View style={styles.chart_container}>
            <LineChart
                data={data}
                width={Dimensions.get("window").width*0.9}
                height={240}
                chartConfig={chartConfig}
                style={styles.chart}
                yAxisSuffix={` ${suffix}`}
                withInnerLines={false}
                onDataPointClick={handleDataPointClick}
                getDotColor={getDotColor}
                verticalLabelRotation={-15}
            />
        </View>
    )
}