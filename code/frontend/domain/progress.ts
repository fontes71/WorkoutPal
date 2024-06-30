type FetchDaysResponse = {
    message: string,
    obj: Array<Stats>
}

type Stats = {
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