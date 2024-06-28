import { Colors } from "@/constants"
import { useState } from "react"
import { View, Text, Dimensions } from "react-native"
import { LineChart } from "react-native-chart-kit"
import progress_styles from "@/assets/styles/progress"

type ChartOptions = {
    readonly title: string,
    readonly data: any
}

type DotInfo = {
    pressedValue?: number,
    selectedDotIndex?: number
}

const styles = progress_styles.chart_styles

export default function Chart({title, data}: ChartOptions) {
    const [dotInfo, setDotInfo] = useState<DotInfo>({})

    const screenWidth = Dimensions.get("window").width / 100 * 90 ;
    /*const data = {
        labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"] as any,
        datasets: [
            {
                data: [80, 76, 65, 70, null, 58, 64, 63, 65, 68, 65, 72] as any,
            }
        ]
    };*/

    const chartConfig = {
        backgroundGradientFrom: Colors.lightBlack,
        backgroundGradientTo: Colors.black,
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,

        decimalPlaces: 1,
        strokeWidth: 2,
        useShadowColorFromDataset: false, 
        style: {
            paddingTop: 16
        }
    };

    const handleDataPointClick = (data: any) => {
        setDotInfo({
            pressedValue: data.value,
            selectedDotIndex: data.index
        })
    };

    const getDotColor = (dataPoint: number, dataPointIndex: number) => {
        if (dotInfo?.selectedDotIndex == dataPointIndex) return Colors.green;
        else return Colors.white
    };

    return(
        <View style={styles.chart_container}>
            {dotInfo?.pressedValue && 
                <Text style={styles.chart_info}>
                    {`${title} ${dotInfo?.pressedValue} kg`}
                </Text>
            }  
            <LineChart
                data={data}
                width={screenWidth}
                height={240}
                chartConfig={chartConfig}
                style={styles.chart}
                yAxisSuffix=" kg"
                withInnerLines={false}
                onDataPointClick={handleDataPointClick}
                getDotColor={getDotColor}
            />
        </View>
    )
}