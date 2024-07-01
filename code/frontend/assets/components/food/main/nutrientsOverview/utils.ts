const getNutrients = (food: Food[] | null) => {
  if (!food) return { calories: 0, protein: 0, carbs: 0, fat: 0 };

  return food?.reduce(
    (acc, it) => {
      acc.calories += it.mainNutrients.calories;
      acc.protein += it.mainNutrients.protein.value ;
      acc.carbs += it.mainNutrients.carbs.value ;
      acc.fat += it.mainNutrients.fat.value 
      return acc;
    },
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );
};

export default getNutrients;
