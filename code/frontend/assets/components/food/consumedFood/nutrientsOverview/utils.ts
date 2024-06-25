const getNutrients = (food: Food[] | null) => {
  if (!food) return { calories: 0, protein: 0, carbs: 0, fat: 0 };

  return food?.reduce(
    (acc, it) => {
      acc.calories += it.calories ? it.calories : 0;
      acc.protein += it.protein ? parseInt(it.protein) : 0;
      acc.carbs += it.carbs ? parseInt(it.carbs) : 0;
      acc.fat += it.fat ? parseInt(it.fat) : 0;
      return acc;
    },
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );
};

export default getNutrients;
