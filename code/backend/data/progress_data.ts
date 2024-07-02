import { IProgressData, IUserData } from "../domain/interfaces";
import { User } from "../domain/types";

export class ProgressData implements IProgressData {
    private userData: IUserData;
  
    constructor(userData: IUserData) {
      this.userData = userData;
    }

    async updateWeight(newWeight: number, day: string, token: string): Promise<User | null> {
        const user: User | null = await this.userData.getUserByToken(token)
        if (!user) return null
        
        const dayIndex = user.days.findIndex((d) => d.date === day)

        if (dayIndex == -1) {
            user.days = [
                ...user.days,
                { date: day, loggedFood: [], workoutPlansDone: [], weight: newWeight }
            ]
        } else {
            const d = user.days[dayIndex];
            user.days[dayIndex] = {
                ...d,
                weight: newWeight,
            }
        } 

        await this.userData.updateUser(token, user)
        return user
    }
}
    
