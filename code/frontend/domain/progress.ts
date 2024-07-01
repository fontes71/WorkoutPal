type FetchDaysResponse = {
    message: string,
    obj: {
        days: Array<DayStats>
    }
}

type DayStats = {
    date: string
    consumedNutrients: ConsumedNutrients
    workoutPlansDone: number
    weight: number
}

type ConsumedNutrients = {
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

