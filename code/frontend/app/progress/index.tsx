import Chart from "@/assets/components/progress/Chart";
import { ScrollView, TouchableOpacity, Text, View } from "react-native";
import progress_styles from "@/assets/styles/progress";
import { Colors } from "@/constants";
import UpdateWeight from "@/assets/components/progress/UpdateWeight";
import NoBottomCutView from "@/assets/components/views/NoBottomCutView";
import { useContext, useEffect, useState } from "react";
import Fetching from "@/assets/components/common/Fetching";
import { getDays, getStatsForMonth, isArrayValid } from "@/services/progress";
import { UserContext } from "@/assets/components/auth/AuthContext";
import InvalidChart from "@/assets/components/progress/InvalidChart";

const styles = progress_styles.main_styles

export default function ProgressScreen() {
    const [fetching, setFetching] = useState(true)
    const [stats, setStats] = useState<Stats>()
    const [period, setPeriod] = useState("month") // there is api support for week and year as well
    const { userContext } = useContext(UserContext)
    const token = userContext?.token

    const getDaysAction = async () => {
        setFetching(true)
        if (token) {
            const days = await getDays(period, token)
            const stats = getStatsForMonth(days)
            setStats(stats)
        }
        setFetching(false)
    } 

    useEffect(() => {
        getDaysAction()
    }, [period])

    const monthLabels = ["Week 1", "Week 2", "Week 3", "Week 4"] // there is api support for week and year as well
    // const weekLabels = ["1", "2", "3", "4", "5", "6", "7"]
    // const yearLabels = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]

    return (
        <>
            {
                fetching 
                    ? <Fetching />
                    : stats && <ScrollView style={styles.main_container}>
                        <NoBottomCutView>
                            { isArrayValid(stats.weights) 
                                ? <Chart title="Weight" days={stats.days} dataset={stats.weights} labels={monthLabels} suffix="kg"/>
                                : <InvalidChart message="Update your weight at least once to have access to weight related statistics"/>
                            }
                            <UpdateWeight />
                            { isArrayValid(stats.workoutPlansDone) 
                                ? <Chart days={stats.days} title="Workouts" dataset={stats.workoutPlansDone} labels={monthLabels} suffix="w/o"/>
                                : <InvalidChart message="Complete at least 1 workout to have access to workout related statistics"/>
                            }
                            { isArrayValid(stats.calories) 
                                ? <Chart title="Calories" days={stats.days} dataset={stats.calories} labels={monthLabels} suffix="cal"/>
                                : <InvalidChart message="Add at least 1 consumed element to have access to nutrients related statistics"/>
                            }
                        </NoBottomCutView>
                    </ScrollView>
            }
        </>
    )
}