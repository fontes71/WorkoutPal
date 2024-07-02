import { isValid, parse } from "date-fns";

const isValidDate = (date: string) => {
    const parsedDate = parse(date, "yyyy-MM-dd", new Date())
    return isValid(parsedDate)

}

export default isValidDate