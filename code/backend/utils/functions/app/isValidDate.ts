export const isValidDate = (dateString: string) => {
    // Regular expression to match the format `dd-mm-yyyy`
    const regex = /^(\d{1,2})-(\d{1,2})-(\d{4})$/;

    // Test the string against the regex
    const match = dateString.match(regex);

    if (!match) {
        return false;
    }

    // Extract day, month, year from the regex match groups
    const day = parseInt(match[1], 10);
    const month = parseInt(match[2], 10);
    const year = parseInt(match[3], 10);

    // Check if the day, month, year are in valid ranges
    if (day < 1 || day > 31 || month < 1 || month > 12 || year < 1000 || year > 9999) {
        return false;
    }

    // Additional check for valid days in month (considering leap years)
    const date = new Date(year, month - 1, day);
    return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
}