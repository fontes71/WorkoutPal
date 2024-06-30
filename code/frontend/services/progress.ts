import getDate from "@/assets/functions/getDate";
import { localhost } from "@/constants";

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
    return body.obj
  }

  return []
}