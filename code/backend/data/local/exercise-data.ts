
import { Exercise, User, WorkoutPlan } from "../../domain/types";
import { IExerciseData } from "../../domain/interfaces";
import { getLocalData } from "../../utils/functions/data";

export class LocalExerciseData implements IExerciseData {
  async getExerciseById(id: string) {
    const exercises = (await getLocalData(
      "data/local/files/exercises.json"
    )) as Exercise[];
    
    const exercise = exercises.find((exercise) => exercise._id === id);
    return exercise || null
  }

  async searchExercisesByName(name: string, skip: number, limit: number) {
    const exercises = (await getLocalData(
      "data/local/files/exercises.json"
    )) as Exercise[];
    
    const filteredExercises = exercises.filter((exercise) =>
      exercise.name.toLowerCase().includes(name.toLowerCase())
    );

    return filteredExercises.slice(skip, skip + limit);
  }

  async searchExercisesByBodyPart(bodyPart: string, skip: number, limit: number) {
    const exercises = (await getLocalData(
      "data/local/files/exercises.json"
    )) as Exercise[];
    
    const filteredExercises = exercises.filter((exercise) =>
      exercise.bodyPart.toLowerCase().includes(bodyPart.toLowerCase())
    );

    return filteredExercises.slice(skip, skip + limit);
  }

  async searchExercisesByEquipment(equipment: string, skip: number, limit: number) {
    const exercises = (await getLocalData(
      "data/local/files/exercises.json"
    )) as Exercise[];
    
    const filteredExercises = exercises.filter((exercise) =>
      exercise.equipment.toLowerCase().includes(equipment.toLowerCase())
    );

    return filteredExercises.slice(skip, skip + limit);
  }

  async searchExercisesByTarget(target: string, skip: number, limit: number) {
    const exercises = (await getLocalData(
      "data/local/files/exercises.json"
    )) as Exercise[];
    
    const filteredExercises = exercises.filter((exercise) =>
      exercise.target.toLowerCase().includes(target.toLowerCase())
    );

    return filteredExercises.slice(skip, skip + limit);
  }

  async searchExercisesBySecondaryMuscle(secondaryMuscle: string, skip: number, limit: number) {
    const exercises = (await getLocalData(
      "data/local/files/exercises.json"
    )) as Exercise[];
    
    const filteredExercises = exercises.filter((exercise) =>
      exercise.secondaryMuscles.some((muscle) => muscle.toLowerCase().includes(secondaryMuscle.toLowerCase()))
    );

    return filteredExercises.slice(skip, skip + limit);
  }

  async getUserWorkoutPlans(token: string): Promise<WorkoutPlan[] | null> {
    const users = (await getLocalData(
      "data/local/files/users.json"
    )) as User[];

    const user = users.find((user) => user.token === token) || null;
    return user !== null ? user.workout_plans : null;
  }

  async createWorkoutPlan(token: string, workoutPlanName: string, description: string): Promise<WorkoutPlan | null> {
    const users = (await getLocalData(
      "data/local/files/users.json"
    )) as User[];

    const user = users.find((user) => user.token === token);
    if (user === undefined) {
      return null;
    }

    if (user.workout_plans.some((workoutPlan) => workoutPlan.name === workoutPlanName)) {
      throw null;
    }

    const newWorkoutPlan = {
      name: workoutPlanName,
      description,
      exercises: []
    };

    user.workout_plans.push(newWorkoutPlan);

    return newWorkoutPlan;
  }

  async addExerciseToWorkoutPlan(token: string, workoutPlanName: string, exerciseId: string): Promise<WorkoutPlan | null> {
    const users = (await getLocalData(
      "data/local/files/users.json"
    )) as User[];

    const user = users.find((user) => user.token === token);
    if (user === undefined) {
      return null;
    }

    let workoutPlanResult = null;
    user.workout_plans.forEach((workoutPlan) => {
      if (workoutPlan.name === workoutPlanName && !workoutPlan.exercises.includes(exerciseId)) {
        workoutPlan.exercises.push(exerciseId);
        workoutPlanResult = workoutPlan;
      }
    });

    return workoutPlanResult;
  }

  cloneExerciseDB(): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
