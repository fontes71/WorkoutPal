import getDate from "@/assets/functions/getDate";
import { localhost } from "@/constants";
import { eachDayOfInterval, format, getDaysInMonth, subMonths } from "date-fns";

export const updateWeight = async (newWeight: number, token: string) => {
    await fetch(`${localhost}/api/progress/updateWeight`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        "newWeight": newWeight,
        "day": getDate()
      })
    });
};

export const getDays = async (period: string, token: string) => {
  const response = await fetch(`${localhost}/api/progress/getDays?period=${period}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${token}`,
    }
  });

  if (response.ok) {
    const body: FetchDaysResponse = await response.json();
    return body.obj.days
  }

  return []
}

export const getStatsForMonth = (daysStats: DayStats[]): Stats => {
  const days = getIntervalOfDays()
  const calories = nullFilledArray(days.length)
  const workoutPlansDone = nullFilledArray(days.length)
  const weights = nullFilledArray(days.length)

  daysStats.forEach((v) => {
    const idx = days.indexOf(v.date)
    calories[idx] = v.loggedNutrients.calories
    workoutPlansDone[idx] = v.workoutPlansDone
    weights[idx] = v.weight
  })

  return {
    days,
    calories,
    workoutPlansDone,
    weights
  }
}

export const isArrayValid = (arr: number[]) => {
  if (!arr) return false
  const filteredArr = arr.filter((v) => v && v != 0)
  return filteredArr.length != 0
}

const nullFilledArray = (size: number) => {
  return new Array(size).fill(null)
}

const getIntervalOfDays = (): string[] => {
  const currentDate = new Date()
  const oneMonthAgo = subMonths(currentDate, 1)
  const allDates = eachDayOfInterval({ start: oneMonthAgo, end: currentDate })
  return allDates.map((d) => format(d, "yyyy-MM-dd"))
}

