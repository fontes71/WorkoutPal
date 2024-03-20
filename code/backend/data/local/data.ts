
import { Exercise, User } from "../../domain/types";
import { IData } from "../../domain/interfaces";




export class Data implements IData {
  
  getUserByToken?(token: string) {
    throw new Error("Method not implemented.");
  }
  
  getUserByMail?(email: string): Promise<User | null> {
    throw new Error("Method not implemented.");
  }

  cloneExerciseDB(): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async createUser(username: string, password: string, mail: string, token: string) {
    throw new Error("Method not implemented.");
  }

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
}
