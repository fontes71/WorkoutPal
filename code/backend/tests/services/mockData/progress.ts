import { ConsumedNutrients, Day, DayStats, User, WorkoutPlan } from "../../../domain/types";

export const mockWeight = 70.2
export const mockDate = "2024-06-20"
export const mockInvalidDate = "9999-06-20"
export const mockToken = "mockToken"
export const mockInvalidToken = "mockInvalidToken"
export const mockPeriod = "month"
export const mockInvalidPeriod = "invalidPeriod"

const mockConsumedNutrients: ConsumedNutrients = {
    calories: 0,
    protein: 0,
    fat: 0,
    carbs: 0
}

export const mockDayStats: Array<DayStats> = [
    {
        date: mockDate,
        consumedNutrients: mockConsumedNutrients,
        workoutPlansDone: 0,
        weight: mockWeight
    }
] 

const mockDay: Day = {
    date: mockDate,
    consumedFood: [],
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