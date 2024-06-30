import Chart from "@/assets/components/progress/Chart";
import { ScrollView, TouchableOpacity, Text, View } from "react-native";
import progress_styles from "@/assets/styles/progress";
import { Colors } from "@/constants";
import UpdateWeight from "@/assets/components/progress/UpdateWeight";
import NoBottomCutView from "@/assets/components/views/NoBottomCutView";
import { useContext, useEffect, useState } from "react";
import Fetching from "@/assets/components/common/Fetching";
import { getDays } from "@/services/progress";
import { UserContext } from "@/assets/components/auth/AuthContext";

const styles = progress_styles.main_styles

export default function ProgressScreen() {
    const [fetching, setFetching] = useState(true)
    const [period, setPeriod] = useState("month")
    const { userContext } = useContext(UserContext)
    const token = userContext?.token

    const getDaysAction = async () => {
        setFetching(true)
        if (token) {
            const days = await getDays(period, token)
            console.log(days)
        }
        setFetching(false)
    } 

    useEffect(() => {
        getDaysAction()
    }, [period])

    const labels = ["Week 1", "Week 2", "Week 3", "Week 4"]
    const labels1 = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "21", "12", "23", "24", "26", "27", "28", "29", "30", "31"]
    const dataset = [80, 76, 65, 70, null, 58, 64, 63, 65, 68, 65, 72, 80, 76, 65, 70, null, 58, 64, 63, 65, 68, 65, 72, 58, 64, 63, 65, 68, 65, 72]
    
    return (
        <>
            {
                fetching 
                    ? <Fetching />
                    :<ScrollView style={styles.main_container}>
                        <NoBottomCutView>
                            <Chart title="Weight" dataset={dataset} labels={labels} suffix="kg"/>
                            <UpdateWeight />
                            <Chart title="Workouts" dataset={dataset} labels={labels} suffix=""/>
                            <Chart title="Calories" dataset={dataset} labels={labels} suffix="cal"/>
                        </NoBottomCutView>
                    </ScrollView>
            }
        </>
       
    )
}