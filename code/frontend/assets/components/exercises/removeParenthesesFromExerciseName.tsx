// Function that removes parentheses from the name of a single exercise
export const removeParenthesesFromExerciseNameAndCapitalizeFirstLetter = (exercise: Exercise) => {
  if (exercise.name.endsWith(")")) {
      exercise.name = exercise.name.slice(0, exercise.name.lastIndexOf("("));
  }
  exercise.name = exercise.name.charAt(0).toUpperCase() + exercise.name.slice(1);
  return exercise;
}

// Function that removes parentheses from the names of all exercises in an array
export const removeParenthesesFromExerciseNamesAndCapitalizeFirstLetter = (exercises: Exercise[]) => {
    for (let i = 0; i < exercises.length; i++) {
      if (exercises[i].name.endsWith(")")) {
        exercises[i].name = exercises[i].name.slice(
          0,
          exercises[i].name.lastIndexOf("(")
        );
      }
      exercises[i].name = exercises[i].name.charAt(0).toUpperCase() + exercises[i].name.slice(1);
    }
    return exercises;
};