import { LoggedNutrients, Day, DayStats, Food, MainNutrients, SecondaryNutrients, User, ValueAndUnit, WorkoutPlan } from "../../../domain/types";

export const mockWeight = 70.2
export const mockDate = "2024-06-20"
export const mockInvalidDate = "9999-06-20"
export const mockToken = "mockToken"
export const mockInvalidToken = "mockInvalidToken"
export const mockPeriod = "month"
export const mockInvalidPeriod = "invalidPeriod"

const mockConsumedNutrients: LoggedNutrients = {
    calories: 0,
    protein: 0,
    fat: 0,
    carbs: 0
}

export const mockDayStats: Array<DayStats> = [
    {
        date: mockDate,
        loggedNutrients: mockConsumedNutrients,
        workoutPlansDone: 0,
        weight: mockWeight
    }
] 

const mockDay: Day = {
    date: mockDate,
    loggedFood: [],
    workoutPlansDone: [],
    weight: mockWeight
}

const mockUsername = "mockUsername"
const mockEmail = "mockEmail"
const mockPassword = "mockPassword"

const mockWorkoutPlans: Array<WorkoutPlan> = []
const mockDays: Array<Day> = [mockDay]

export const mockUser: User = {
    username: mockUsername,
    email: mockEmail,
    password: mockPassword,
    token: mockToken,
    workout_plans: mockWorkoutPlans,
    days: mockDays
}

const createSecondaryNutrients = (): SecondaryNutrients => {
    return {"fiber": null, "saturatedFat": null, "salt": null, "sodium": null, "sugars": null}
}

const createValueAndUnit = (value: number): ValueAndUnit => {
    return {"value": value, "unit": "irrelevant"}
}

const createMainNutrients = (calories: number, protein: number, fat: number, carbs: number): MainNutrients => {
    return {"calories": calories, "protein": createValueAndUnit(protein), "fat": createValueAndUnit(fat), "carbs": createValueAndUnit(carbs)}
}

const createFoodItem = (calories: number, protein: number, fat: number, carbs: number): Food => {
    return {
        "id": "irrelevant",
        "name": "irrelevant",
        "brand": "irrelevant",
        "quantity": createValueAndUnit(0),
        "imageUrl": "irrelevant",
        "mainNutrients": createMainNutrients(calories, protein, fat, carbs),
        "secondaryNutrients": createSecondaryNutrients(),
        "nutriscoreGrade": "irrelevant"
    }
}

export const foodArr: Food[] = [
    createFoodItem(250, 15, 8.6, 12),
    createFoodItem(463, 29, 12, 18),
    createFoodItem(362, 26, 25, 19)
]

export const emptyFoodArr: Food[] = []