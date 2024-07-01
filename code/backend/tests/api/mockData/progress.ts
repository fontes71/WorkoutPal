const mockDay = "2024-04-15"
const mockWeight = 70.5
const mockInvalidDay = "invalidDay"

export const mockToken = "token"
export const mockInvalidToken = "invalidToken"
export const mockPeriod = "month"
export const mockInvalidPeriod = "invalidPeriod"

export const mockResponseUpdateWeightBody = {
    "message": `Weight of day (${mockDay}) updated successfully`,
    "obj": {}
}

export const mockServiceDays = [
    {
        "date": "2024-06-30",
        "consumedNutrients": {
            "calories": 1051,
            "protein": 17,
            "fat": 60,
            "carbs": 107
        },
        "workoutPlansDone": 1,
        "weight": 72.8
    },
    {
        "date": "2024-07-01",
        "consumedNutrients": {
            "calories": 241,
            "protein": 9.2,
            "fat": 13,
            "carbs": 19
        },
        "workoutPlansDone": 0,
        "weight": 72.6
    }
]

export const mockResponseGetDaysBody = {
    "message": "Days Successfully Fetched",
    "obj": {
        "days": mockServiceDays
    }
}

export const mockGetDaysRequest = {
    headers: {
        authorization: `Bearer ${mockToken}`,
    },
    query: {
        period: mockPeriod
    }
}

export const mockGetDaysInvalidPeriodRequest = {
    headers: {
        authorization: `Bearer ${mockToken}`,
    },
    query: {
        period: mockInvalidPeriod
    }
}

export const mockGetDaysInvalidTokenRequest = {
    headers: {
        authorization: `Bearer ${mockInvalidToken}`,
    },
    query: {
        period: mockPeriod
    }
}

export const mockUpdateWeightRequest = {
    body: {
        newWeight: mockWeight,
        day: mockDay
    },
    headers: {
        authorization: `Bearer ${mockToken}`,
    }
}

export const mockUpdateWeightInvalidDateRequest = {
    body: {
        newWeight: mockWeight,
        day: mockInvalidDay
    },
    headers: {
        authorization: `Bearer ${mockToken}`,
    }
}

export const mockUpdateWeightInvalidTokenRequest = {
    body: {
        newWeight: mockWeight,
        day: mockInvalidDay
    },
    headers: {
        authorization: `Bearer ${mockInvalidToken}`,
    }
}