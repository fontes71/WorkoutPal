import { User } from "../domain/types";;
import { IProgressData, IProgressServices, IUserData} from "../domain/interfaces";
import { transactionHandler } from "../utils/functions/data";
import { UnauthorizedError } from "../errors/app_errors";
  
export class ProgressServices implements IProgressServices {
    private progressData: IProgressData;
    private userData: IUserData;
  
    constructor(progressData: IProgressData, userData: IUserData) {
      this.progressData = progressData;
      this.userData = userData;
    }

    async updateWeight(newWeight: number, day: string, token: string): Promise<void> {
        return transactionHandler( async () => {
            const user: User | null = await this.userData.getUserByToken(token);
            if (!user) throw UnauthorizedError;
            
            const dayIndex = user.days.findIndex((d) => d.date === day);

            if (dayIndex == -1) {
                user.days = [
                    ...user.days,
                    { date: day, consumedFood: [], workoutPlansDone: [], weight: newWeight}
                ];
            } else {
                const d = user.days[dayIndex];
                user.days[dayIndex] = {
                    ...d,
                    weight: newWeight,
                };
            } 

            await this.userData.updateUser(token, user);
        })
    } 
  }
  