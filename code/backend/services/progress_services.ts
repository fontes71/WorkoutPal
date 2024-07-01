import { DayStats, User } from "../domain/types";;
import { IProgressData, IProgressServices, IUserData} from "../domain/interfaces";
import { transactionHandler } from "../utils/functions/data";
import { InvalidDateError, InvalidParamsError, UnauthorizedError } from "../errors/app_errors";
import { dayToDayStats, getStartOfPeriod, isValidPeriod } from "../utils/functions/app/progress";
import { isWithinInterval, isBefore } from "date-fns";
  
export class ProgressServices implements IProgressServices {
    private progressData: IProgressData;
    private userData: IUserData;
  
    constructor(progressData: IProgressData, userData: IUserData) {
      this.progressData = progressData;
      this.userData = userData;
    }

    async updateWeight(newWeight: number, day: string, token: string): Promise<void> {
        return transactionHandler( async () => {
            const providedDate = new Date(day)
            const currDate = new Date()
            if (!isBefore(providedDate, currDate)) throw InvalidDateError
            const user: User | null = await this.progressData.updateWeight(newWeight, day, token)
            if (!user) throw UnauthorizedError
        })
    }
    
    async getDays(period: string, token: string): Promise<DayStats[]> {
        return transactionHandler(async () => {
            if (!isValidPeriod(period)) throw InvalidParamsError
            const user: User | null = await this.userData.getUserByToken(token);
            if (!user) throw UnauthorizedError;

            const days = user.days
            const currDate = new Date()
            currDate.setDate(currDate.getDate() + 1)
            const startDate = getStartOfPeriod(currDate, period)
            const daysInInterval = days.filter((d) => isWithinInterval(d.date, { start: startDate, end: currDate}))
            return dayToDayStats(daysInInterval)
        })
    }
  }
  