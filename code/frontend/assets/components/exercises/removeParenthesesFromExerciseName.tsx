// Function that removes parentheses from the name of a single exercise
export const removeParenthesesFromExerciseName = (exercise: Exercise) => {
  if (exercise.name.endsWith(")")) {
      exercise.name = exercise.name.slice(0, exercise.name.lastIndexOf("("));
  }
  return exercise;
}

// Function that removes parentheses from the names of all exercises in an array
export const removeParenthesesFromExerciseNames = (exercises: Exercise[]) => {
    for (let i = 0; i < exercises.length; i++) {
      if (exercises[i].name.endsWith(")")) {
        exercises[i].name = exercises[i].name.slice(
          0,
          exercises[i].name.lastIndexOf("(")
        );
      }
    }
    return exercises;
};