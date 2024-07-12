export const getSecondaryNutrientsAsList = (secondaryNutrients: SecondaryNutrients, nutriscore: string | null) => {
    const nutrientsList = Object.entries(secondaryNutrients).filter(([key, item]) => item?.value != null).map(([key, item]) => ({ name: key, value: item?.value as number, unit: item?.unit }));
    if (nutriscore != null) {
      return [
        ...nutrientsList,
        {name: "nutriscore", value: nutriscore, unit: ""}
      ];
    }
    return nutrientsList
  }
  