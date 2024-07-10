export function splitPath(path: string): string[] {
    return path.split("/").slice(1)
}

export function isMainFitnessScreen(mainScreenName: string) {
    return mainScreenName == "fitness"
}

export function isMainNutritionScreen(mainScreenName: string) {
    return mainScreenName == "food"
}