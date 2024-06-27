import { query } from "express";
import { Exercise, WorkoutPlan } from "../../../domain/types";
import { W } from "mongodb";
import { mockToken } from "./auth";

export const mockExercise: Exercise = {
    _id: "0001",
    name: "testExercise",
    bodyPart: "testBodyPart",
    equipment: "testEquipment",
    gifUrl: "testGifUrl",
    target: "testTarget",
    secondaryMuscles: ["testSecondaryMuscle1", "testSecondaryMuscle2"],
    instructions: ["testInstruction1", "testInstruction2"]
};

export const mockWorkoutPlan: WorkoutPlan = {
    name: "testWorkoutPlan",
    description: "testDescription",
    exercises: ["0001"]
};

export const mock_token = "IrrelevantToken";

export const mockSearchByIdRequest = {
    params: {
        exerciseId: "IrrelevantId"
    }
}

export const mockResponseSearchByIdBody = {
    message: "Exercise found",
    obj: mockExercise
}

export const mockSearchByNameRequest = {
    params: {
        exerciseName: "IrrelevantName"
    },
    query: {
        skip: 0,
        limit: 10
    }
}

export const mockSearchByBodyPartRequest = {
    params: {
        exerciseBodyPart: "IrrelevantBodyPart"
    },
    query: {
        skip: 0,
        limit: 10
    }
}

export const mockSearchByEquipmentRequest = {
    params: {
        exerciseEquipment: "IrrelevantEquipment"
    },
    query: {
        skip: 0,
        limit: 10
    }
}

export const mockSearchByTargetRequest = {
    params: {
        exerciseTarget: "IrrelevantTarget",
    },
    query: {
        skip: 0,
        limit: 10
    }
}

export const mockSearchBySecondaryMuscleRequest = {
    params: {
        exerciseSecondaryMuscle: "IrrelevantSecondaryMuscle"
    },
    query: {
        skip: 0,
        limit: 10
    }
}

export const mockSearchByNameAndFiltersRequest = {
    params: {
        exerciseName: "IrrelevantName"
    },
    query: {
        skip: 0,
        limit: 10,
        bodyPart: "IrrelevantBodyPart",
        equipment: "IrrelevantEquipment",
        target: "IrrelevantTarget"
    }
}

export const mockResponseEmptySearchBody = {
    message: "Search successful",
    obj: []
}

export const mockResponseSearchBody = {
    message: "Search successful",
    obj: [mockExercise]
}




export const mockGetUserWorkoutPlansRequest = {
    headers: {
        authorization: mockToken,
    }
}

export const mockResponseGetUserWorkoutPlansBody = {
    message: "Workout plans fetched successfully",
    obj: [mockWorkoutPlan]
}

export const mockCreateWorkoutPlanRequest = {
    body: {
        workoutPlanName: "IrrelevantName",
        description: "IrrelevantDescription"
    },
    headers: {
        authorization: mockToken,
    }
}

export const mockResponseCreateWorkoutPlanBody = {
    message: "Workout plan created",
    obj: mockWorkoutPlan
}

export const mockAddExerciseToWorkoutPlanRequest = {
    params: {
        workoutPlanName: "IrrelevantName"
    },
    body: {
        exerciseId: "IrrelevantId"
    },
    headers: {
        authorization: mockToken,
    }
}

export const mockResponseAddExerciseToWorkoutPlanBody = {
    message: "Exercise added to workout plan",
    obj: mockWorkoutPlan
}

export const mockRemoveExerciseFromWorkoutPlanRequest = {
    params: {
        workoutPlanName: "IrrelevantName",
        exerciseId: "IrrelevantId"
    },
    headers: {
        authorization: mockToken,
    }
}

export const mockResponseRemoveExerciseFromWorkoutPlanBody = {
    message: "Exercise removed from workout plan",
    obj: mockWorkoutPlan
}

export const mockLogWorkoutPlanRequest = {
    body: {
        workoutPlanName: "IrrelevantName"
    },
    headers: {
        authorization: mockToken,
    }
}

export const mockResponseLogWorkoutPlanBody = {
    message: "Workout plan logged",
    obj: mockWorkoutPlan
}

export const mockGetDailyLoggedWorkoutPlansRequest = {
    params: {
        day: "IrrelevantDay"
    },
    headers: {
        authorization: mockToken,
    }
}

export const mockResponseGetDailyLoggedWorkoutPlansBody = {
    message: "Daily logged workout plans fetched successfully",
    obj: [mockWorkoutPlan]
}