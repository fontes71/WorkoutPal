type FetchDaysResponse = {
    message: string,
    obj: {
        days: Array<DayStats>
    }
}

type DayStats = {
    date: string
    loggedNutrients: LoggedNutrients
    workoutPlansDone: number
    weight: number
}

type LoggedNutrients = {
    calories: number,
    protein: number,
    fat: number,
    carbs: number
}

type Stats = {
    days: string[],
    calories: number[],
    workoutPlansDone: number[],
    weights: number[]
}

