import { subMonths, subWeeks, subYears } from "date-fns"
import { LoggedNutrients, Day, DayStats, Food } from "../../../domain/types"

const validPeriods = ["week", "month", "year"]

export function isValidPeriod(period: string): boolean {
    return validPeriods.includes(period)
}

export function getStartOfPeriod(currDate: Date, period: string): Date {
    switch (period) {
        case 'week':
            return subWeeks(currDate, 1)
        case 'year':
            return subYears(currDate, 1)
        default :
            return subMonths(currDate, 1)
    }
}

export function getConsumedNutrients(loggedFood: Food[]): LoggedNutrients {
    let calories = 0;
    let protein = 0;
    let fat = 0;
    let carbs = 0;
    loggedFood.forEach((f) => {
        const mn = f.mainNutrients
        calories += mn.calories
        protein += mn.protein.value
        fat += mn.fat.value
        carbs += mn.carbs.value
    })

    return {calories, protein, fat, carbs}
}

export function dayToDayStats(days: Day[]): DayStats[] {
    return days.map((d) => {
        return {
            "date": d.date, 
            "loggedNutrients": getConsumedNutrients(d.loggedFood),
            "workoutPlansDone": d.workoutPlansDone.length,
            "weight": d.weight ? d.weight : null
        }
    })
}