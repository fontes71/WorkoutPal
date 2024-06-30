import { Day, DayStats, User } from "../domain/types";;
import { IProgressData, IProgressServices, IUserData} from "../domain/interfaces";
import { transactionHandler } from "../utils/functions/data";
import { InvalidParamsError, UnauthorizedError } from "../errors/app_errors";
import { dayToDayStats, getConsumedNutrients, getFormattedDate, getStartOfPeriod, isValidPeriod } from "../utils/functions/progress";
import getDate from "../utils/functions/app/getDate";
import { format } from "path";
import { formatDate, eachDayOfInterval, subMonths, isWithinInterval } from "date-fns";
  
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
    
    async getDays(period: string, token: string): Promise<DayStats[]> {
        return transactionHandler(async () => {
            if (!isValidPeriod(period)) throw InvalidParamsError
            const user: User | null = await this.userData.getUserByToken(token);
            if (!user) throw UnauthorizedError;

            const days = user.days
            const currDate = new Date
            const startDate = getStartOfPeriod(currDate, period)
            const daysInInterval = days.filter((d) => isWithinInterval(getFormattedDate(d.date), { start: startDate, end: currDate }))
            return dayToDayStats(daysInInterval)
        })
    }
  }
  