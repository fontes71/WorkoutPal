import { Request, Response } from "express"

export function exercisesApi(services, data) {

    function getExerciseById(req: Request, res: Response) {
        return services.getExerciseById(req.params)
    }



    return [
        getExerciseById

    ]
}
